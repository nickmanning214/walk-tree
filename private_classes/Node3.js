
class Node{
    constructor(tree,path,value){
        this.tree = tree;
        this.path = path;
        this.value = value; //Maybe change this name so it doesn't conflict with stuff

        //The issue is that it's possible that there is no easy "value" and that it has to be made dynamically.

    }   
    getParentNode(){
        //console.log(this.tree._getNodeByPath([1]))
        return this.tree._getNodeByPath(this.path.slice().splice(0,this.path.length - 1));
    }

    getValue(){//for convenience of avoiding node.value.value.
        return this.value;
    }
}
module.exports = Node;
