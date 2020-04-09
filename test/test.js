const assert = require('assert');
const walk = require('../index.js')
const letterPyramidFlat = require('./letterPyramidFlat.js');
const letterPyramidNested = require('./letterPyramidNested.js');

function getFirstKeyInLetterPyramid(){
    return 'a';
    //or search for anything without a parent
    //or search for anything in the first level of the object
}


function getFirstValueInLetterPyramid(obj){
    return obj.a;
    //or search for anything without a parent
    //or search for anything in the first level of the object
}


function parentItemToChildrenInFlatCollection(obj,parentItem,parentKey){
    return Object.keys(obj).map(key=>obj[key]).filter(item=>item.parent===parentKey)
}


describe('collection',function(){
    it('should walk the tree',function(){
        console.log(
        walk(
            letterPyramidFlat,
            function(tree,parentNode,Node){
                console.log(typeof parentNode,parentNode);
                if (!parentNode) {
                    return [
                        new Node({key:'a'},tree.a)
                    ] //or return a list of them that don't have parents.
                }
                else return Object.keys(tree).map(key=>tree[key]).filter(node=>node.parent===parentNode.metaData.key)
            }
        )
        )

        //walk(letterPyramidNested,getFirstRowInLetterPyramid)

        //assert.deepEqual(['one','two'],['one','two'])
    })
})
