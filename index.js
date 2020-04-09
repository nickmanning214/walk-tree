class Node{
    constructor(metaData,value){
        this.metaData = metaData;
        this.value = value;
    }
}



function walk(tree,getChildNodesOfParentNode, currentNodes = [], parentNode){

    if (typeof parentNode == 'undefined') currentNodes = walk(tree,getChildNodesOfParentNode,[],new Node({key:'a'},tree.a))
    else{
        currentNodes.push(parentNode);

        getChildNodesOfParentNode(tree,parentNode,Node).forEach(childNode=>{
            
            currentNodes = walk(tree,getChildNodesOfParentNode,currentNodes,childNode);
        })
        //rest
    }
    return currentNodes;

}













module.exports = walk;
