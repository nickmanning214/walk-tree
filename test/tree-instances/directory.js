const Tree = require('../../index.js').Tree;
const fs = require('fs');
const path = require('path');


function describeRoots(structure){
    return [structure];
}
function describeChildren(parentNode,structure){
    if (fs.lstatSync(parentNode.value).isDirectory()){
        return fs.readdirSync(parentNode.value).map(n=>path.join(parentNode.value,n));
    }
    else return [];
}

const DIR_PATH = path.join(__dirname,'..','structures/directory');

const directoryTree = new Tree(DIR_PATH,describeRoots,describeChildren);

module.exports = directoryTree;
