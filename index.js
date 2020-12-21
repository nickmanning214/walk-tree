//const { structure } = require("./test/tree-instances/nestedArray");
const remove = require('lodash.remove');
function arrayequal(array1,array2){
    //https://stackoverflow.com/a/19746771/1763217
    return array1.length === array2.length && array1.every((value, index) => value === array2[index])

}

const fs = require('fs');

Object.defineProperty( Array.prototype, "last", {
    enumerable: false,
    configurable: false,
    writable: false,
    value: function() {
        return this[ this.length - 1 ];
    }
} );

//This is after Node3. I think I do need metaData as I noted in another file.
class Node{
    constructor(tree,path,value,metaData){
        this.tree = tree;
        this.path = path;
        this.value = value; //Maybe change this name so it doesn't conflict with stuff
        this.metaData = metaData;
        //The issue is that it's possible that there is no easy "value" and that it has to be made dynamically.
    }   
}


class Tree{
    #structure
    #describeRoots
    #describeChildren
    #describeAdd
    #describeEdit
    #describeRemove
    #firstNodes
    #nodes
    #getNodeByPath(pathArr){
        return this.#nodes.filter(node=>arrayequal(pathArr,node.path))[0]; // todo "find" instead of filter
    }
    #pushRootNode(value){

        let index = 0;
        while(this.#getNodeByPath([index++]));

        this.nodes.push(new Node([index],value));
    }
    constructor(structure,describeRoots,describeChildren,describeAdd = ()=>{},describeEdit = ()=>{},describeRemove = ()=>{}){
        
        //The goal of this constructor method is to build the #nodes array. Then, there will be public methods on this array.

        //Attach structure and describes as private properties.
        this.#structure = structure;
        this.#describeRoots = describeRoots; //returns an array of values from the structure
        this.#describeChildren = describeChildren; //returns an array of values from a node (and a structure)
        this.#describeAdd = describeAdd;
        this.#describeEdit = describeEdit;
        this.#describeRemove = describeRemove;

        //derive #nodes array from #describeRoots and #describeChildren
        Promise.resolve(this.#describeRoots(this.#structure)).then(e=>{
            this.#firstNodes = e.map((value,i)=>{
                return new Node(this,[i],value);
            });

            this.#nodes = [...this.#firstNodes];

            //recursive function to add each child node of the current node to #nodes
            function addChildNodes(node){
                //node is already in the array
                Promise.resolve(this.#describeChildren(node,this.#structure)).then(e=>{
                    e.map((value,j,nodes)=>{
                        return new Node(this,[...node.path,j],value);
                    }).forEach(node=>{
                        this.#nodes.push(node);
                        addChildNodes.call(this,node)
                    });

                })

            }

            this.#firstNodes.forEach(node=>{
                //"node" is already in the array
                addChildNodes.call(this,node);
            })

    

            })

    }

    

    

    //but why not the entire node? Or why not the value and the metadata at least?
    getValueByPath(pathArr){
        const node = this.#getNodeByPath(pathArr);
        return node && node.value;
    }

    //async because of await this.describeRoots(this.structure);
    async getChildrenByPath(pathArr){
        if (pathArr.length == 0){
            return await this.describeRoots(this.structure);
        }
        
        let children = [];
        
        let currentChildIndex = 0;
        let currentChildPath = [...pathArr,currentChildIndex]
        
        let currentChildNode = this.#getNodeByPath(currentChildPath);
        while(currentChildNode){
            children.push(this.getValueByPath(currentChildPath));
            currentChildIndex++;
            currentChildPath = [...pathArr,currentChildIndex]
            currentChildNode = this.#getNodeByPath(currentChildPath);
        }
        return children;
    }

    

    //Maybe addChildNode instead of pushChildNode, and give the ability to add at index
    //Also does it make more sense to make this a method on the node rather than on the tree?
    //deprecated?
    async pushChildNode(parentPath,value,callback){
        if (parentPath.length == 0){
            this.#pushRootNode(value);
        }


        const parentNode = this.#getNodeByPath(parentPath);
        const children = await this.getChildrenByPath(parentPath);
        const newNode = new Node(this,[...parentNode.path,children.length],value);
        this.#nodes.push(newNode)
        
        return this;
        //return this.getValueByPath(pathArr);
        //callback(this.structure,parentNode,value);
            
        
    }

    async addChildNode(parentPath,atIndex,value){
        


        let numberOfChildren = (await this.getChildrenByPath(parentPath)).length;

        
        for(var i = numberOfChildren - 1;i>=atIndex;i--){
            const nextSiblingNode = this.#getNodeByPath([...parentPath,i]);
            nextSiblingNode.path[nextSiblingNode.path.length - 1]++;
        }


        const newNode = new Node(this,[...parentPath,atIndex],value);
        this.#nodes.push(newNode)
        this.#describeAdd(this.#structure,parentPath,atIndex,value);
        return this.#structure;
    }

    async removeChildNode(parentPath,atIndex,value){
        //you must remove all children as well
        remove(this.#nodes,n=>arrayequal(n.path,[...parentPath,atIndex]));
        let currentIndex = atIndex+1;
        let node;
        while(node = this.#getNodeByPath([...parentPath,currentIndex])){
            node.path[node.path.length-1]--;
            currentIndex++;
        }
        this.#describeRemove(this.#structure,parentPath,atIndex,value);
        return this.#structure;
    }

    async editChildNode(parentPath,atIndex,newValue){
        //you must remove all children as well
        const node = this.#getNodeByPath([...parentPath,atIndex])
        node.value = newValue;
        this.#describeEdit(this.#structure,parentPath,atIndex,newValue);
        return this.#structure;
    }


}

module.exports = Tree;
