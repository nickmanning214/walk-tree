
class Node3{
    constructor(tree,path,value){
        this.tree = tree;
        this.path = path;
        this.value = value;
    }
    getParentNode(){
        //console.log(this.tree._getNodeByPath([1]))
        return this.tree._getNodeByPath(this.path.slice().splice(0,this.path.length - 1));
    }
}
module.exports = Node3;
