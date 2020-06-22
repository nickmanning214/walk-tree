class Node{
    constructor(metaData,value){
        this.metaData = metaData;
        this.value = value;
    }
}

class Tree{
    constructor(structure,getFirstNode,getChildNodesOfParentNode){
        this.structure = structure;
        this.getFirstNode = getFirstNode;
        this.getChildNodesOfParentNode = getChildNodesOfParentNode;
    }
    flatten(currentNodes = [], parentNode){ //old "walk"

        if (typeof parentNode == 'undefined') currentNodes = walk([],this.getFirstNode(tree,Node))
        else{
            currentNodes.push(parentNode);
    
            this.getChildNodesOfParentNode(this.tree,parentNode,Node).forEach(childNode=>{
                
                currentNodes = walk(currentNodes,childNode);
            })
            //rest
        }
        return currentNodes;
    
    }
    
}






//old
function walk(tree,getFirstNode,getChildNodesOfParentNode, currentNodes = [], parentNode){

    if (typeof parentNode == 'undefined') currentNodes = walk(tree,getFirstNode,getChildNodesOfParentNode,[],getFirstNode(tree,Node))
    else{
        currentNodes.push(parentNode);

        getChildNodesOfParentNode(tree,parentNode,Node).forEach(childNode=>{
            
            currentNodes = walk(tree,getFirstNode,getChildNodesOfParentNode,currentNodes,childNode);
        })
        //rest
    }
    return currentNodes;

}













module.exports = {Tree, walk};
