const letterPyramidFlat = require('./test/letterPyramidFlat.js');
const letterPyramidNested = require('./test/letterPyramidNested.js');

class Node{
    constructor(metaData,value){
        this.metaData = metaData;
        this.value = value;
    }
}





function walkFlat(letterPyramidFlat,currentNode,currentNodes = []){
    if (typeof currentNode == 'undefined') currentNodes = walkFlat(letterPyramidFlat,new Node({key:'a'},letterPyramidFlat.a),[])
    else{
        currentNodes.push(currentNode);
        const children = Object.keys(letterPyramidFlat).map(key=>new Node({key},letterPyramidFlat[key])).filter(node=>node.value.parent==currentNode.metaData.key)
        children.forEach(child=>{
            
            currentNodes = walkFlat(letterPyramidFlat,child,currentNodes)
        })
    }
    return currentNodes;
}

function walkNested(letterPyramidNested,currentNode,currentNodes = []){
    if (typeof currentNode == 'undefined') currentNodes = walkNested(letterPyramidNested,new Node({key:'a'},letterPyramidNested.a),[])
    else{
        currentNodes.push(currentNode);
        if (typeof currentNode.value.children !== 'undefined'){
            const children = Object.keys(currentNode.value.children).map(key=>new Node({key,parent:currentNode.metaData.key},currentNode.value.children[key]));
            children.forEach(child=>{
                
                currentNodes = walkNested(letterPyramidNested,child,currentNodes)
            })
        }
       
    }
    return currentNodes;
}

function walkFlatMapping(tree,map){
    return walkFlat(tree).map(map)
}

function walkNestedMapping(tree,map){
    return walkNested(tree).map(map)
}

console.log("FLAT:")
console.log(flat = walkFlatMapping(letterPyramidFlat,node=>{
    return `${node.metaData.key}:${node.value.vowel?'(vowel)':''}${node.value.parent?`parent:${node.value.parent}`:''}`;
}));


console.log("NESTED:")
console.log(flat = walkNestedMapping(letterPyramidNested,node=>{
    return `${node.metaData.key}:${node.value.vowel?'(vowel)':''}${node.metaData.parent?`parent:${node.metaData.parent}`:''}`;
}));
//console.log(walkFlat(letterPyramidFlat),walkNested(letterPyramidNested));

debugger;
module.exports = function walkTree(tree,getChildrenFromParent,currentNodes){
    
    currentNodes = currentNodes || [];

 
    const firstChildren = getChildrenFromParent(tree,null,Node);

    

    return firstChildren;

    
}
