const assert = require('assert');
const walk = require('../index.js')
const letterPyramidFlat = require('./letterPyramidFlat.js');
const letterPyramidNested = require('./letterPyramidNested.js');
const path = require('path');

let flat = walk(letterPyramidFlat,(tree,parentNode,Node)=>{
    //Here Calculate children from entire tree or from parentNode
    const allTreeKeys = Object.keys(tree);
    const keysToNode = key=>new Node({key},tree[key]);
    const allTreeNodes = allTreeKeys.map(keysToNode)
    return allTreeNodes.filter(node=>node.value.parent==parentNode.metaData.key);
});

let nested = walk(letterPyramidNested,(tree,parentNode,Node)=>{
    const allChildKeys = typeof parentNode.value.children !== 'undefined'? Object.keys(parentNode.value.children) : [];
    const keysToNode = key=>new Node({key,parent:parentNode.metaData.key},parentNode.value.children[key]);
    return allChildKeys.map(keysToNode);
});

/*
let directory = walk(path.join(__dirname,'directory'),(tree,parentNode,node)=>{
    
})
*/


describe('collection',function(){
    it('should walk the tree',function(){
        
        assert.deepEqual(
            flat.map(n=>`${n.metaData.key}${n.value.vowel?'vowel':''}${n.value.parent?`parent:${n.value.parent}`:''}`).sort(),
            nested.map(n=>`${n.metaData.key}${n.value.vowel?'vowel':''}${n.metaData.parent?`parent:${n.metaData.parent}`:''}`).sort()
        )

    })
})

describe('directory',function(){
    it('should walk the directory',function(){

    })
})
