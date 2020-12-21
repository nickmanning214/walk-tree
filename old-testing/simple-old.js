const assert = require('assert');
const Tree = require('../index.js');

const structure = null;//this shows do you even need to pass the structure?
const describeRoots = function(){
    return [1,2,3];
}
const describeChildren = function(parentNode,structure){
    let arr = [];
    console.log(parentNode)
    for(var i=parentNode.value+1;i<5;i++){
        arr.push(i);
    }
    return arr;
}

const tree = new Tree(structure,describeRoots,describeChildren);
/*

At start, the tree looks like this:

          1                    2              3
   2      3      4         3      4           4
  3 4     4                4
  4
*/
console.log(tree)

describe('Tree',function(){
   
    describe('#getValueByPath',function(){
        it('should get the right value for each path',function(){
            
            //All this seems redundant.
            //Simplify this even more perhaps.
            assert(tree.getValueByPath([0]),1)
            assert(tree.getValueByPath([1]),2)
            assert(tree.getValueByPath([2]),3)
            
            assert(tree.getValueByPath([0,0]),2)
            assert(tree.getValueByPath([0,1]),3)
            assert(tree.getValueByPath([0,2]),4)

            assert(tree.getValueByPath([1,0]),3)
            assert(tree.getValueByPath([1,1]),4)

            assert(tree.getValueByPath([2,0]),4)

            assert(tree.getValueByPath([0,0,0]),3)
            assert(tree.getValueByPath([0,0,1]),4)

            assert(tree.getValueByPath([0,1,0]),4)

            assert(tree.getValueByPath([0,0,1]),4)

            assert(tree.getValueByPath([0,0,0,0]),4)
        });
    })
})
