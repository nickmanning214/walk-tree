const letterPyramidNested = require('../structures/letterPyramidNested.js');

const Tree = require('../../index.js').Tree;

function describeRootsNested(structure){
    return Object.keys(structure).map(key=>structure[key]);
}
function describeChildrenNested(parentNode,structure){
    return typeof parentNode.value.children !== 'undefined'? Object.keys(parentNode.value.children).map(key=>parentNode.value.children[key]) : [];
   
}
const nestedTree = new Tree(letterPyramidNested,describeRootsNested,describeChildrenNested)

module.exports = nestedTree;
