const structure = require('../structures/nestedArray.js');

const Tree = require('../../index.js');

function describeRoots(structure){
    //roots are all of the integers of the array (in the first level of depth)
    return structure.map((e,i)=>{
        return {
            //originalArrayIndex:i,
            value:e,
            next:structure[i+1]
        }
    }).filter(e=>!Array.isArray(e.value));
}
function describeChildren(parentNode,structure){

    //children are the integers of the next item in the array




    //Two approaches:
    //1. Capture index as metadata
    //2. Reverse engineer all of it to get the value from the path (on parentNode.path)

    //1 is much easier for the time being.
    
    const possibleChildren = parentNode.value.next;
    let children;
    if (Array.isArray(possibleChildren)){
        children = possibleChildren.map((e,i)=>{
            //return e;
            return {
                //originalArrayIndex:i,
                value:e,
                next:possibleChildren[i+1]
            }
        }).filter(e=>!Array.isArray(e.value))
    }else{
        children = [];
    }
    return children;
   
}

function getRawIndex(arr,derivedIndex){
    let currentIndex = 0; 
    for (var i=0;i<arr.length;i++){
        if (!(Array.isArray(arr[i]))) {
            if (currentIndex == derivedIndex) break;
            currentIndex++;
        }
    }
    return i;
}

function describeAdd(structure,parentPath,atIndex,value){
    
    //when you call .add, this will be called afterwards to also manipulate the structure
    //maybe this could be considered onAdd

    

    let childNodes = structure;
    let hasNoChildren;
    //get the last array, (the last index will be the last value, the last array will be second to last)
    //nevermind because this is parent array
    for(var i=0;i<parentPath.length;i++){
        let derivedIndex = parentPath[i]; //
        let rawIndex = getRawIndex(childNodes,derivedIndex);
        if (Array.isArray(childNodes[rawIndex+1])){
            childNodes = childNodes[rawIndex+1];
        }
        else{
            //this 
            hasNoChildren = true;
            if (i<parentPath.length - 1){//if it is the last time through the loop, which it should be
                throw "This is an error. No children and you're not done looping through"
            }
        }
    }
    //console.log('cns',childNodes)
    if (hasNoChildren){
        if (atIndex!==0) throw 'No children so index has to be 0';
        const parentIndex = getRawIndex(childNodes,parentPath[parentPath.length - 1])
        childNodes.splice(parentIndex+1,0,[value])

    }
    else{
        childNodes.splice(atIndex,0,value);
    }
   
    //I don't think this will work all of the time because you're using atIndex which is derived 
    //but you need a raw index

    //My hypothesis is that this wouldn't work if there were children in the array BEFORE atIndex
    
   


}

function describeEdit(structure,parentPath,atIndex,value){
    console.log('to do describe edit...maybe there can be simply a way to reverse engineer from structure based on path')
}

function describeRemove(structure,parentPath,atIndex,value){
    let path = [...parentPath,atIndex];

}

const nestedTree = new Tree(structure,describeRoots,describeChildren,describeAdd,describeEdit,describeRemove)

module.exports = {
    tree:nestedTree,structure:structure
};
