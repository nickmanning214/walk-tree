const walk = require('../index.js')



module.exports = function(obj,parentAttribute){
    //Todo support a function in place of parentAttribute

    function getFirstNode(tree,Node){
        const keyWithNoParent = Object.keys(obj).filter(key=>{
            return !tree[key][parentAttribute];
        })[0];//only supports one for now
        return new Node({key:keyWithNoParent},tree[keyWithNoParent])
    }

    function getChildNodesFromTreeAndParentNode(tree,parentNode,Node){
        //Here Calculate children from entire tree or from parentNode
        const allTreeKeys = Object.keys(tree);
        const keysToNode = key=>new Node({key},tree[key]);
        const allTreeNodes = allTreeKeys.map(keysToNode)
        return allTreeNodes.filter(node=>node.value[parentAttribute]==parentNode.metaData.key);
    }

    return walk(obj,getFirstNode,getChildNodesFromTreeAndParentNode);
}
