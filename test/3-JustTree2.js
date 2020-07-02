const assert = require('assert');
const remove = require('lodash.remove');
const { nodes } = require('./tree-instances/custom.js');

describe('Tree',function(){
    
    const Tree = require('../TreeBeta.js');

    function describeRoots(structure){
        return structure;
    }
    function describeChildren(parent,structure){
       return parent.kids || [];
    }

    const structure = [
        {
            name:'Grandfather',
            kids:[
                {
                    name:'Father',
                        kids:[
                            {name:'Me'},
                            {name:'Brother'},
                            {name:'Sister'}
                        ]
                },
                {
                    name:'Uncle',
                    kids:[
                        {name:'Cousin'}
                    ]
                },
                {name:'Aunt'}
            ]
        },{
            name:'Granduncle'
        }
    ];

    function describeAdd(node){
        //this is messing it up

        let index = node.path[node.path.length - 1];

        let parentValue = node.getParentNode().value;

        if (!parentValue.kids) {

            parentValue.kids = [node.value];

        }
        else{
            node.getParentNode().value.kids.splice( index, 0, node.value );
        } 
    }

    function describeEdit(node){

        let index = node.path[node.path.length - 1];

        node.getParentNode().value.kids[index] = node.value;
    }

    function describeRemove(node){

        let index = node.path[node.path.length - 1];

        remove(node.getParentNode().value.kids,function(e,i){
            return i==index;
        });
    }

    const tree = new Tree(structure,describeRoots,describeChildren,describeAdd,describeEdit,describeRemove);

  

    //Read
    describe('#getValueByPath',function(){
       
        it('should work',function(){
            assert(tree.getValueByPath([0]) === structure[0]);
            assert(tree.getValueByPath([1]) === structure[1]);
            assert(tree.getValueByPath([0,0]) === structure[0].kids[0]);
            assert(tree.getValueByPath([0,0,0]) === structure[0].kids[0].kids[0]);
            assert(tree.getValueByPath([0,0,1]) === structure[0].kids[0].kids[1]);
            assert(tree.getValueByPath([0,0,2]) === structure[0].kids[0].kids[2]);


        })
        

    })


    
    describe('#getChildrenByPath',function(){
        it('should work',function(){
            
            //assert(tree.getChildrenByPath([0]) === structure[0].kids); Note: this one fails (as it should I think)
            assert.deepStrictEqual(tree.getChildrenByPath([0]) , structure[0].kids);

        })
    });

    //Create
    describe('#addChildNode',function(){

        const obj = {name:'First cousin once removed'};
        tree.addChildNode([1],obj,0);

        it('should add a child node to the node list',function(){
            //console.log(tree.nodes.map(n=>`${n.value.name} ${n.path}`))
            //console.log(tree.getValueByPath([1,0]), obj)
            
            assert(tree.getValueByPath([1,0]) === obj);

        });
        it('should update the structure',function(){

            //actually, these might happen regardless!

            assert(structure[1].kids[0].name==='First cousin once removed');
            //This should be set prior
            //parentValue.kids.splice( index, 0, obj );

            //Pass the node, add some properties, and you can do something like this
            //node.getParentNode().value.kids.splice( index, 0, obj );

        })
       

    })

    //Update
    
    
    describe('#editNode', function(){
        it('should',function(){
            const obj = {name:'First cousin (once removed)'};
            tree.editNode([1,0],obj);
            assert(tree.getValueByPath([1,0]) === obj);     
        });
        it('should update the structure',function(){
            assert(structure[1].kids[0].name==='First cousin (once removed)');

            //parentValue.kids[index] = obj;
        })
       
    })
    //Delete
    
    describe('#removeNode', function(){
        it('should work',function(){
            assert.deepStrictEqual(tree.getValueByPath([0,0,1]) , {name:'Brother'});
            tree.removeNode([0,0,1]);
            assert.deepStrictEqual(tree.getValueByPath([0,0,1]) , {name:'Sister'});
        })
        it('should update the structure',function(){
            assert(structure[0].kids[0].kids[1].name==='Sister');

            /*
            remove(parentValue.kids,function(e,i){
                return i==index;
            })*/
        })

    });
    


})
