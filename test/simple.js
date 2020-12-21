const assert = require('assert');
const Tree = require('../index.js');

const structure = null;//this shows do you even need to pass the structure?
const describeRoots = function(){
    return [1,2,3];
}
const describeChildren = function(parentNode,structure){
    if (parentNode.value===1) return [4];
    else return [];
}

const tree = new Tree(structure,describeRoots,describeChildren);
/*

At start, the tree looks like this:

          1                    2              3
          4
*/
console.log(tree)

describe('Tree',function(){
   
    describe('#getValueByPath',function(){
        it('should support root nodes',function(){

            assert.deepStrictEqual(tree.getValueByPath([0]),1)
            assert.deepStrictEqual(tree.getValueByPath([1]),2)
            assert.deepStrictEqual(tree.getValueByPath([2]),3)
            assert.deepStrictEqual(typeof tree.getValueByPath([3]),'undefined')
        });
        it('should support child nodes',function(){
            assert.deepStrictEqual(tree.getValueByPath([0,0]),4);
            assert.deepStrictEqual(typeof tree.getValueByPath([0,1]),'undefined');
            assert.deepStrictEqual(typeof tree.getValueByPath([1,0]),'undefined');
            assert.deepStrictEqual(typeof tree.getValueByPath([2,0]),'undefined');

        })
    });
    describe('#addChildNode',function(){
        it('should push a node to the end of the array',async function(){
            await tree.addChildNode([0],1,5);
            assert.deepStrictEqual(tree.getValueByPath([0,1]),5);
        });
    });
    describe('#removeChildNode',function(){
        it('should remove a child node',async function(){
            await tree.removeChildNode([0],1,5);
            assert.deepStrictEqual(typeof tree.getValueByPath([0,1]),'undefined');
        });
    });
    describe('#editChildNode',function(){
        it('should edit a child node',async function(){
            await tree.editChildNode([0],0,'what is this');
            assert.deepStrictEqual(tree.getValueByPath([0,0]),'what is this');
        });
    });

    

})
