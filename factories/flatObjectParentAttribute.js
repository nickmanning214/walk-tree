const Tree = require('../TreeBeta.js');


function describeRoots(structure){
    //returns the value
    //return [structure.a] // hardcoded. Also check for obj with no "parent" attribute.
    //console.log( [structure.a],Object.keys(structure).filter(key=>!structure[key].parent).map(key=>structure[key]))
    return Object.keys(structure).filter(key=>!structure[key].parent).map(key=>{
        return {
            key:key,
            value:structure[key]
        }
    });
}

function describeChildren(parentValue,structure){
    const parentKey = parentValue.key;
    const structureToArrayAndReformatted = Object.keys(structure).map(key=>{return {key,value:structure[key]}});
    const children = structureToArrayAndReformatted.filter(reformattedChild=>{

        return reformattedChild.value.parent == parentKey;
    })
    return children;
}

function describeAdd(node){
    console.log(node);

}
function describeEdit(node){
    console.log(node);

}
function describeRemove(node){
    console.log(node);

}


module.exports = function(initialStructure){
    return new Tree(initialStructure,describeRoots,describeChildren,describeAdd,describeEdit,describeRemove)
}
