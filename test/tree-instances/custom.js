const Tree = require('../../index.js').Tree;
const customStructure = require('../structures/custom.js');

function describeRoots(structure){
    return [structure[0][0]];
}

function describeChildren(parentNode,structure){
    function arr_equal(array1,array2){
        return array1.length === array2.length && array1.every(function(value, index) { return value === array2[index]})
    }

    if (arr_equal(parentNode.path, [0])){ 

        return structure[1];
    }
    else if (arr_equal(parentNode.path, [0,0])){
        return structure[2];
    }
    else if (arr_equal(parentNode.path, [0,1])){
        return structure[3];
    }
    else if (arr_equal(parentNode.path,[0,2])){
        return structure[4]
    }
    else return [];
}
const customTree = new Tree(customStructure,describeRoots,describeChildren)

module.exports = customTree;
