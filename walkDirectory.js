const walk = require('./index.js')
const path = require('path');
const fs = require('fs');

module.exports = function(parentPath,dirName){
    function getFirstNode(dirName,Node){
       return new Node({parentPath},dirName);
    }

    function getChildNodesFromTreeAndParentNode(originalDirName,parentNode,Node){
        const dirName = path.join(parentNode.metaData.parentPath,parentNode.value);
        if (fs.lstatSync(dirName).isDirectory()){
            return fs.readdirSync(dirName).map(fileName=>new Node({parentPath:dirName},fileName))
        }
        else return [];
    }



    return walk(dirName,getFirstNode,getChildNodesFromTreeAndParentNode);


}
