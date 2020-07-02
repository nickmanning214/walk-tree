//old, deprecated
class Node{
    constructor(metaData,value){
        this.metaData = metaData;
        this.value = value;
    }
}


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


module.exports = walk;


