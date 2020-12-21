const assert = require('assert');
const Tree = require('../TreeBeta.js');
const Node = require('../private_classes/Node3.js')
describe('Tree (Simple Example)',function(){
    let structure = '';


    function describeRoots(structure){
        return ['root1','root2'];
    }
    function describeChildren(parent,structure){
        if (parent==='root1') return ['child of root1'];
        else if (parent==='root2') return ['child of root2', 'another child of root2'];
        else return [];
    }
    function describeAdd(node){
        structure+=`added ${node.getValue()}`
    }

    function describeEdit(node){
        structure+=`edited ${node.getValue()}`

    }

    function describeRemove(node){
        //structure+=`removed ${node.getValue()}`
        structure+='removed';
    }

    
    let tree = new Tree(structure,describeRoots,describeChildren,describeAdd,describeEdit,describeRemove);

   
    describe('#constructor',function(){
        it('should correctly assemble the "nodes" array',function(){


            assert(Array.isArray(tree.nodes));
            assert(tree.nodes.every(node=>node instanceof Node));
    
            //TODO it doesn't HAVE to be in this order...
            assert(tree.nodes[0].value == 'root1')
            assert(tree.nodes[1].value == 'root2')
            assert(tree.nodes[2].value == 'child of root1')
            assert(tree.nodes[3].value == 'child of root2')
            assert(tree.nodes[4].value == 'another child of root2')
            
            assert.deepStrictEqual(tree.nodes[0].path,[0])
            assert.deepStrictEqual(tree.nodes[1].path,[1])
            assert.deepStrictEqual(tree.nodes[2].path,[0,0])
            assert.deepStrictEqual(tree.nodes[3].path,[1,0])
            assert.deepStrictEqual(tree.nodes[4].path,[1,1])
        });

    });

    describe('#addNode',function(){

        it('should add to the nodes array',function(){
            
            tree.addChildNode([1],'middlechild',1);
            assert.deepStrictEqual(tree.nodes[0].path,[0])
            assert.deepStrictEqual(tree.nodes[1].path,[1])
            assert.deepStrictEqual(tree.nodes[2].path,[0,0])
            assert.deepStrictEqual(tree.nodes[3].path,[1,0])
            assert.deepStrictEqual(tree.nodes[4].path,[1,2])
            assert.deepStrictEqual(tree.nodes[5].path,[1,1])

            assert(tree.nodes[0].value == 'root1')
            assert(tree.nodes[1].value == 'root2')
            assert(tree.nodes[2].value == 'child of root1')
            assert(tree.nodes[3].value == 'child of root2')
            assert(tree.nodes[4].value, 'another child of root2')
            assert(tree.nodes[5].value == 'middlechild')


        })
    })

    describe('#editNode',function(){

        it('should edit the nodes array',function(){
            
            tree.editNode([1,1],'middlechild edited');

            assert.deepStrictEqual(tree.nodes[0].path,[0])
            assert.deepStrictEqual(tree.nodes[1].path,[1])
            assert.deepStrictEqual(tree.nodes[2].path,[0,0])
            assert.deepStrictEqual(tree.nodes[3].path,[1,0])
            assert.deepStrictEqual(tree.nodes[4].path,[1,2])
            assert.deepStrictEqual(tree.nodes[5].path,[1,1])

            assert(tree.nodes[0].value == 'root1')
            assert(tree.nodes[1].value == 'root2')
            assert(tree.nodes[2].value == 'child of root1')
            assert(tree.nodes[3].value == 'child of root2')
            assert(tree.nodes[4].value, 'another child of root2')
            assert(tree.nodes[5].value == 'middlechild edited')


        })
    })

    describe('#removeNode',function(){

        it.skip('should remove a node from the nodes array',function(){
            //I think this test is wrong
            tree.removeNode([1]);

            assert(tree.nodes[0].value == 'root1')
            assert(tree.nodes[1].value == 'root2')
            assert(tree.nodes[2].value == 'child of root1')
            assert(tree.nodes[3].value == 'child of root2')
            assert(tree.nodes[4].value == 'another child of root2')

            assert.deepStrictEqual(tree.nodes[0].path,[0])
            assert.deepStrictEqual(tree.nodes[1].path,[1])
            assert.deepStrictEqual(tree.nodes[2].path,[0,0])
            assert.deepStrictEqual(tree.nodes[3].path,[1,0])
            assert.deepStrictEqual(tree.nodes[4].path,[1,1])
            


        })

        it('should remove an entire branch',function(){
            tree.removeNode([1]);
            assert(tree.nodes.length == 2);
            assert(tree.nodes[0].value == 'root1')
            assert(tree.nodes[1].value == 'child of root1')
            assert.deepStrictEqual(tree.nodes[0].path,[0])
            assert.deepStrictEqual(tree.nodes[1].path,[0,0])


        })

    })

    

});
