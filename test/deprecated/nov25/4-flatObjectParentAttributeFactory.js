const factory = require('../factories/flatObjectParentAttribute.js');
const data = require('./structures/letterPyramidFlat.js')();


describe('factory',function(){
    const tree = factory(data);

    it('should make a tree',function(){
    });

    it('should add',function(){
        //console.log(tree)
        //tree.addChildNode([1,1],{vowel:false},0);
        //console.log(tree.structure)
    })

    it.skip('should edit',function(){
        tree.editNode(pathArr,value,index)
    })

    it.skip('should remove',function(){
        tree.removeNode(pathArr,value,index)
    })
})
