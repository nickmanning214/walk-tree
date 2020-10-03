const Node_Beta = require('./private_classes/Node_Beta.js');

function arrayequal(array1,array2){
    //https://stackoverflow.com/a/19746771/1763217
    return array1.length === array2.length && array1.every((value, index) => value === array2[index])

}

class Tree{
    constructor(structure,describeRoots,describeChildren,describePush){
        this.structure = structure;
        this.describeRoots = describeRoots;
        this.describeChildren = describeChildren;
        this.describePush = describePush;
        
        Promise.resolve(this.describeRoots(this.structure)).then(e=>{
            this.firstNodes = e.map((value,i)=>{
                return new Node_Beta([i],value);
            });

            this.nodes = [...this.firstNodes];

            function addChildNodes(node){
                //node is already in the array
                Promise.resolve(this.describeChildren(node,this.structure)).then(e=>{
                    e.map((value,j,nodes)=>{
                        return new Node_Beta([...node.path,j],value);
                    }).forEach(node=>{
                        this.nodes.push(node);
                        addChildNodes.call(this,node)
                    });

                })

            }

            this.firstNodes.forEach(node=>{
                //"node" is already in the array
                addChildNodes.call(this,node);
            })

    

            })
        


      

    }

    getNodeByPath(pathArr){
        return this.nodes.filter(node=>arrayequal(pathArr,node.path))[0]; // todo "find" instead of filter
    }


    getValueByPath(pathArr){
        const node = this.getNodeByPath(pathArr);
        return node && node.value;
    }

    getChildrenByPath(pathArr){
        let children = [];
        
        let currentChildIndex = 0;
        let currentChildPath = [...pathArr,currentChildIndex]
        let currentChildNode = this.getNodeByPath(currentChildPath);

        while(currentChildNode){
            children.push(this.getValueByPath(currentChildPath));
            currentChildIndex++;
            currentChildPath = [...pathArr,currentChildIndex]
            currentChildNode = this.getNodeByPath(currentChildPath);
        }
        return children;
    }

    _pushRootNode(value){

        let index = 0;
        while(this.getNodeByPath([index++]));

        this.nodes.push(new Node_Beta([index],value));
    }

    pushChildNode(pathArr,value,callback){
        if (pathArr.length == 0){
            this._pushRootNode(value);
        }


        const parentNode = this.getNodeByPath(pathArr);
        const children = this.getChildrenByPath(pathArr);
        this.nodes.push(new Node_Beta([...parentNode.path,children.length],value));
        callback(this.structure,parentNode,value);
    }
    
}














module.exports = {Tree};
