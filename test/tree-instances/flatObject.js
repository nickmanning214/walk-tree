const letterPyramidFlat = require('../structures/letterPyramidFlat.js');
const Tree = require('../../index.js').Tree;


function describeRootsFlat(structure){
    //returns the value
    //return [structure.a] // hardcoded. Also check for obj with no "parent" attribute.
    //console.log( [structure.a],Object.keys(structure).filter(key=>!structure[key].parent).map(key=>structure[key]))
    return Object.keys(structure).filter(key=>!structure[key].parent).map(key=>structure[key]);
}

function describeChildrenFlat(parentNode,structure){
    //returns the array of values
    const values =  Object.keys(structure).map(key=>structure[key]);
    return values.filter(value=>structure[value.parent] == parentNode.value);
}

const flatTree = new Tree(letterPyramidFlat,describeRootsFlat,describeChildrenFlat)

module.exports = flatTree;
