const walk = require('../index.js')

module.exports = function(obj){
    function getFirstNode(tree,Node){
        //todo support multiple
        return Object.keys(tree).map(key=>new Node({key},tree[key]))[0]
    }

    function getChildNodesFromTreeAndParentNode(tree,parentNode,Node){
        const allChildKeys = typeof parentNode.value.children !== 'undefined'? Object.keys(parentNode.value.children) : [];
        const keysToNode = key=>new Node({key,parent:parentNode.metaData.key},parentNode.value.children[key]);
        return allChildKeys.map(keysToNode);
    }

    return walk(obj,getFirstNode,getChildNodesFromTreeAndParentNode);


}
