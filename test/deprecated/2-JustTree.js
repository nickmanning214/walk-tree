/*
const assert = require('assert');

describe('Tree',function(){
    
    const Tree = require('../TreeBeta.js');

    function describeRoots(structure){
        return [729];
    }
    function describeChildren(parent,structure){
        for(var i=2;i<parent-1;i++){
            if (parent % i == 0) return [i,parent/i];
        }
        return [];
    }
    const tree = new Tree(null,describeRoots,describeChildren);

    function test(arr,val){
        return tree.getValueByPath(arr) == val
    }

    //Read
    describe('#getValueByPath',function(){
       


        assert(test([0],729));
        assert(test([1],undefined));

        assert(test([0,0],3));
        assert(test([0,1],729/3));
        assert(test([0,2],undefined));

        assert(test([0,1,0],3));
        assert(test([0,1,1],81));
        assert(test([0,1,2],undefined));

        assert(test([0,1,1,0],3));
        assert(test([0,1,1,1],27));
        assert(test([0,1,1,2],undefined));

        assert(test([0,1,1,1,0],3));
        assert(test([0,1,1,1,1],9));
        assert(test([0,1,1,1,2],undefined));

        assert(test([0,1,1,1,1,0],3));
        assert(test([0,1,1,1,1,1],3));
        assert(test([0,1,1,1,1,2],undefined));
    })
    describe('#getChildrenByPath',function(){
        assert.deepStrictEqual(tree.getChildrenByPath([0]),[3,243]);
        assert.deepStrictEqual(tree.getChildrenByPath([0,1]),[3,81]);
        assert.deepStrictEqual(tree.getChildrenByPath([0,1,1]),[3,27]);
        assert.deepStrictEqual(tree.getChildrenByPath([0,1,1,1]),[3,9]);
        assert.deepStrictEqual(tree.getChildrenByPath([0,1,1,1,1]),[3,3]);
        assert.deepStrictEqual(tree.getChildrenByPath([0,1,1,1,1,1]),[]);
    });

    //Create
    describe('#addChildNode',function(){
        tree.addChildNode([0,1],'added',0);
        assert(test([0,1,0],'added'));
        assert(test([0,1,1],3));
        assert(test([0,1,2],81));
        assert(test([0,1,3],undefined));

    })

    //Update
    describe('#editNode', function(){
        function test(arr,val){
            return tree.getValueByPath(arr) == val
        }
        tree.editNode([0],999999);
        assert(test([0],999999));
    })

    //Delete
    describe('#removeNode', function(){
        function test(arr,val){
            return tree.getValueByPath(arr) == val
        }

       

        tree.removeNode([0,1,1]);
        

        assert(test([0,1,0],'added'));
        assert(test([0,1,1],81));

    });
    
    


})
*/
