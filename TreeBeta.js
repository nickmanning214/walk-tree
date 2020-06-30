const Node3 = require('./private_classes/Node3.js');
const remove = require('lodash.remove');

function arrayequal(array1,array2){
    //https://stackoverflow.com/a/19746771/1763217
    return array1.length === array2.length && array1.every((value, index) => value === array2[index])

}

class Tree{
    constructor(structure,describeRoots,describeChildren,describeAdd,describeEdit,describeRemove){
        this.structure = structure;
        this.describeRoots = describeRoots;
        this.describeChildren = describeChildren;
        
        this.describeAdd = describeAdd;
        this.describeEdit = describeEdit;
        this.describeRemove = describeRemove;

        this.firstNodes = this.describeRoots(this.structure).map((value,i)=>{
            return new Node3(this,[i],value);
        });

        let nodes = [...this.firstNodes];

        function addChildNodes(node){
            //node is already in the array
            let childNodes = this.describeChildren(node.value,this.structure).map((value,j,nodes)=>{
                return new Node3(this,[...node.path,j],value);
            });

            childNodes.forEach(node=>{
                nodes.push(node);
                addChildNodes.call(this,node)
            })

        }

        this.firstNodes.forEach(node=>{
            //"node" is already in the array
            addChildNodes.call(this,node);
        })

 
        this.nodes = nodes;


      

    }

    _getNodeByPath(pathArr){
        return this.nodes.filter(node=>arrayequal(pathArr,node.path))[0]; // todo "find" instead of filter
    }


    getValueByPath(pathArr){
        const node = this._getNodeByPath(pathArr);
        return node && node.value;
    }

    _getChildNodesByPath(pathArr){
        let children = [];
        
        let currentChildIndex = 0;
        let currentChildPath = [...pathArr,currentChildIndex]
        let currentChildNode = this._getNodeByPath(currentChildPath);

        while(currentChildNode){
            children.push(this._getNodeByPath(currentChildPath));
            currentChildIndex++;
            currentChildPath = [...pathArr,currentChildIndex]
            currentChildNode = this._getNodeByPath(currentChildPath);
        }
        return children;
    }

    getChildrenByPath(pathArr){
        let children = [];
        
        let currentChildIndex = 0;
        let currentChildPath = [...pathArr,currentChildIndex]
        let currentChildNode = this._getNodeByPath(currentChildPath);

        while(currentChildNode){
            children.push(this.getValueByPath(currentChildPath));
            currentChildIndex++;
            currentChildPath = [...pathArr,currentChildIndex]
            currentChildNode = this._getNodeByPath(currentChildPath);
        }
        return children;
    }

    _pushRootNode(value){

        let index = 0;
        while(this.getNodeByPath([index++]));

        this.nodes.push(new Node3(this,[index],value));
    }

    pushChildNode(pathArr,value,callback){
        if (pathArr.length == 0){
            this._pushRootNode(value);
        }


        const parentNode = this.getNodeByPath(pathArr);
        const children = this.getChildrenByPath(pathArr);
        this.nodes.push(new Node3(this,[...parentNode.path,children.length],value));
        callback(this.structure,parentNode,value);
    }

    editNode(pathArr,value){
        const node = this._getNodeByPath(pathArr);
        node.value = value;
        this.describeEdit(node);
    }

    removeNode(pathArr){
        const removed = remove(this.nodes,function(node){
            return arrayequal(node.path,pathArr);
        })[0];
        this.describeRemove(removed);

        const path = removed.path;
        const pathLength = path.length;
        let index = path[pathLength-1];
        
        let parentPath = path.slice(0,-1);

        let node;
        //console.log('index',index,[...parentPath,index++])
        while(node = this._getNodeByPath([...parentPath,++index])){
            node.path[node.path.length-1]--;
        }
    }
    
    addChildNode(pathArr,value,index){
        let i = index;
        let children = this._getChildNodesByPath(pathArr);
        let child;
        while (child = children[i++]){
            child.path[child.path.length-1]++;
        }

        const node = new Node3(this,[...pathArr,index],value);
        this.nodes.push(node);
        this.describeAdd(node);


    }

}














module.exports = Tree;
