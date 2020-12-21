const assert = require('assert');
const Tree = require('../index.js');

const nestedArray = require('../test/tree-instances/nestedArray.js');
const nestedArrayTree = nestedArray.tree;
const nestedArrayStructure = nestedArray.structure;


//ToDo: it is clear to me that technically it is not necessary to test the "decribe" functions in this file. I just need to test the node Array works as expected.

describe('Tree',function(){
   
    describe('#getValueByPath',function(){
        it('should get the right value',function(){

            
            assert.deepStrictEqual(nestedArrayTree.getValueByPath([ 0 ]),{ value: 1, next: 2 })
            assert.deepStrictEqual(nestedArrayTree.getValueByPath([ 1 ]),{ value: 2, next: [3,4] })
            assert.deepStrictEqual(nestedArrayTree.getValueByPath([ 1, 0 ]),{ value: 3, next: 4 })
            assert.deepStrictEqual(nestedArrayTree.getValueByPath([ 1, 1 ]),{ value: 4, next: undefined })
            assert.deepStrictEqual(nestedArrayTree.getValueByPath([ 2 ]),{ value: 5, next: [6,7,8,[9,10,11,12,[13,14],15,16]] })
            assert.deepStrictEqual(nestedArrayTree.getValueByPath([ 2, 0 ]),{ value: 6, next: 7 })
            assert.deepStrictEqual(nestedArrayTree.getValueByPath([ 2, 1 ]),{ value: 7, next: 8 })
            assert.deepStrictEqual(nestedArrayTree.getValueByPath([ 2, 2 ]),{ value: 8, next: [9,10,11,12,[13,14],15,16] })
            assert.deepStrictEqual(nestedArrayTree.getValueByPath([ 2, 3 ]),undefined)
            assert.deepStrictEqual(nestedArrayTree.getValueByPath([ 2, 2, 0 ]),{ value: 9, next: 10 })
            assert.deepStrictEqual(nestedArrayTree.getValueByPath([ 2, 2, 1 ]),{ value: 10, next: 11 })
            assert.deepStrictEqual(nestedArrayTree.getValueByPath([ 2, 2, 2 ]),{ value: 11, next: 12 })
            assert.deepStrictEqual(nestedArrayTree.getValueByPath([ 2, 2, 3 ]),{ value: 12, next: [13,14] })
            assert.deepStrictEqual(nestedArrayTree.getValueByPath([ 2, 2, 3, 0 ]),{ value: 13, next: 14 })
            assert.deepStrictEqual(nestedArrayTree.getValueByPath([ 2, 2, 3, 1 ]),{ value: 14, next: undefined })
            assert.deepStrictEqual(nestedArrayTree.getValueByPath([ 2, 2, 3, 2 ]),undefined)
            assert.deepStrictEqual(nestedArrayTree.getValueByPath([ 2, 2, 4 ]),{ value: 15, next: 16 })
            assert.deepStrictEqual(nestedArrayTree.getValueByPath([ 2, 2, 5 ]),{ value: 16, next: undefined })
            assert.deepStrictEqual(nestedArrayTree.getValueByPath([ 2, 2, 6 ]), undefined)
            assert.deepStrictEqual(nestedArrayTree.getValueByPath([ 3 ]),undefined)

            //assert.deepStrictEqual(nestedArrayTree.getValueByPath([ 2, 2, 4 ]),{ value: 15, next: 16 })
            
            /*
            console.log(nestedArrayTree._nodes.map(e=>{
                return {
                    path:e.path,
                    value:e.value
                }
            }));
            //console.log(nestedArrayTree.getValueByPath([1,0])); //todo return metadata too
            */
        })
    });
    describe('#addChildNode',function(){
        it('should add a child node',async function(){
            await nestedArrayTree.addChildNode([2,2],1,'cat');
            assert.deepStrictEqual(nestedArrayTree.getValueByPath([ 0 ]),{ value: 1, next: 2 })
            assert.deepStrictEqual(nestedArrayTree.getValueByPath([ 1 ]),{ value: 2, next: [3,4] })
            assert.deepStrictEqual(nestedArrayTree.getValueByPath([ 1, 0 ]),{ value: 3, next: 4 })
            assert.deepStrictEqual(nestedArrayTree.getValueByPath([ 1, 1 ]),{ value: 4, next: undefined })
            assert.deepStrictEqual(nestedArrayTree.getValueByPath([ 2 ]),{ value: 5, next: [6,7,8,[9,'cat',10,11,12,[13,14],15,16]] })
            assert.deepStrictEqual(nestedArrayTree.getValueByPath([ 2, 0 ]),{ value: 6, next: 7 })
            assert.deepStrictEqual(nestedArrayTree.getValueByPath([ 2, 1 ]),{ value: 7, next: 8 })
            assert.deepStrictEqual(nestedArrayTree.getValueByPath([ 2, 2 ]),{ value: 8, next: [9,'cat',10,11,12,[13,14],15,16] })
            assert.deepStrictEqual(nestedArrayTree.getValueByPath([ 2, 3 ]),undefined)
            assert.deepStrictEqual(nestedArrayTree.getValueByPath([ 2, 2, 0 ]),{ value: 9, next: 10 })
            assert.deepStrictEqual(nestedArrayTree.getValueByPath([ 2, 2, 1 ]),'cat')
            assert.deepStrictEqual(nestedArrayTree.getValueByPath([ 2, 2, 2 ]),{ value: 10, next: 11 })
            assert.deepStrictEqual(nestedArrayTree.getValueByPath([ 2, 2, 3 ]),{ value: 11, next: 12 })
            assert.deepStrictEqual(nestedArrayTree.getValueByPath([ 2, 2, 4 ]),{ value: 12, next: [13,14] })
            assert.deepStrictEqual(nestedArrayTree.getValueByPath([ 2, 2, 3, 0 ]),{ value: 13, next: 14 })
            assert.deepStrictEqual(nestedArrayTree.getValueByPath([ 2, 2, 3, 1 ]),{ value: 14, next: undefined })
            assert.deepStrictEqual(nestedArrayTree.getValueByPath([ 2, 2, 3, 2 ]),undefined)
            assert.deepStrictEqual(nestedArrayTree.getValueByPath([ 2, 2, 5 ]),{ value: 15, next: 16 })
            assert.deepStrictEqual(nestedArrayTree.getValueByPath([ 2, 2, 6 ]),{ value: 16, next: undefined })
            assert.deepStrictEqual(nestedArrayTree.getValueByPath([ 2, 2, 7 ]), undefined)
            assert.deepStrictEqual(nestedArrayTree.getValueByPath([ 3 ]),undefined);
            
            
            assert.deepStrictEqual(nestedArrayStructure,[
                1,
                2,
                    [3,4],
                5,
                    [6,7,8,
                        [9,'cat',10,11,12,[13,14],15,16
                    ]
                ]
            ])

            /*
            This works as expected, but have to test I guess?
            await nestedArrayTree.addChildNode([1,1],0,'dog');
            console.log(nestedArrayStructure)
            */

        });

       

    });
    describe('#removeChildNode',function(){
        it('should work',async function(){
            structure = await nestedArrayTree.removeChildNode([2,2],0);

            assert.deepStrictEqual(nestedArrayTree.getValueByPath([ 0 ]),{ value: 1, next: 2 })
            assert.deepStrictEqual(nestedArrayTree.getValueByPath([ 1 ]),{ value: 2, next: [3,4] })
            assert.deepStrictEqual(nestedArrayTree.getValueByPath([ 1, 0 ]),{ value: 3, next: 4 })
            assert.deepStrictEqual(nestedArrayTree.getValueByPath([ 1, 1 ]),{ value: 4, next: undefined })
            assert.deepStrictEqual(nestedArrayTree.getValueByPath([ 2 ]),{ value: 5, next: [6,7,8,[9,'cat',10,11,12,[13,14],15,16]] })
            assert.deepStrictEqual(nestedArrayTree.getValueByPath([ 2, 0 ]),{ value: 6, next: 7 })
            assert.deepStrictEqual(nestedArrayTree.getValueByPath([ 2, 1 ]),{ value: 7, next: 8 })
            assert.deepStrictEqual(nestedArrayTree.getValueByPath([ 2, 2 ]),{ value: 8, next: [9,'cat',10,11,12,[13,14],15,16] })
            assert.deepStrictEqual(nestedArrayTree.getValueByPath([ 2, 3 ]),undefined)
            assert.deepStrictEqual(nestedArrayTree.getValueByPath([ 2, 2, 0 ]),'cat')
            assert.deepStrictEqual(nestedArrayTree.getValueByPath([ 2, 2, 1 ]),{ value: 10, next: 11 })
            assert.deepStrictEqual(nestedArrayTree.getValueByPath([ 2, 2, 2 ]),{ value: 11, next: 12 })
            assert.deepStrictEqual(nestedArrayTree.getValueByPath([ 2, 2, 3 ]),{ value: 12, next: [13,14] })
            assert.deepStrictEqual(nestedArrayTree.getValueByPath([ 2, 2, 3, 0 ]),{ value: 13, next: 14 })
            assert.deepStrictEqual(nestedArrayTree.getValueByPath([ 2, 2, 3, 1 ]),{ value: 14, next: undefined })
            assert.deepStrictEqual(nestedArrayTree.getValueByPath([ 2, 2, 3, 2 ]),undefined)
            assert.deepStrictEqual(nestedArrayTree.getValueByPath([ 2, 2, 4 ]),{ value: 15, next: 16 })
            assert.deepStrictEqual(nestedArrayTree.getValueByPath([ 2, 2, 5 ]),{ value: 16, next: undefined })
            assert.deepStrictEqual(nestedArrayTree.getValueByPath([ 2, 2, 6 ]), undefined)
            assert.deepStrictEqual(nestedArrayTree.getValueByPath([ 3 ]),undefined);

            /*

            todo get this working. Also todo, remove child nodes of removed node.
            assert.deepStrictEqual(nestedArrayStructure,[
                1,
                2,
                    [3,4],
                5,
                    [6,7,8,
                        [9,10,11,12,[13,14],15,16
                    ]
                ]
            ])*/
        })
        

    });
    describe('#editChildNode',function(){
        it('should work',async function(){
            await nestedArrayTree.editChildNode([2,2],0,'Hello!!!');
            assert.deepStrictEqual(nestedArrayTree.getValueByPath([ 0 ]),{ value: 1, next: 2 })
            assert.deepStrictEqual(nestedArrayTree.getValueByPath([ 1 ]),{ value: 2, next: [3,4] })
            assert.deepStrictEqual(nestedArrayTree.getValueByPath([ 1, 0 ]),{ value: 3, next: 4 })
            assert.deepStrictEqual(nestedArrayTree.getValueByPath([ 1, 1 ]),{ value: 4, next: undefined })
            assert.deepStrictEqual(nestedArrayTree.getValueByPath([ 2 ]),{ value: 5, next: [6,7,8,[9,'cat',10,11,12,[13,14],15,16]] })
            assert.deepStrictEqual(nestedArrayTree.getValueByPath([ 2, 0 ]),{ value: 6, next: 7 })
            assert.deepStrictEqual(nestedArrayTree.getValueByPath([ 2, 1 ]),{ value: 7, next: 8 })
            assert.deepStrictEqual(nestedArrayTree.getValueByPath([ 2, 2 ]),{ value: 8, next: [9,'cat',10,11,12,[13,14],15,16] })
            assert.deepStrictEqual(nestedArrayTree.getValueByPath([ 2, 3 ]),undefined)
            assert.deepStrictEqual(nestedArrayTree.getValueByPath([ 2, 2, 0 ]),'Hello!!!')
            assert.deepStrictEqual(nestedArrayTree.getValueByPath([ 2, 2, 1 ]),{ value: 10, next: 11 })
            assert.deepStrictEqual(nestedArrayTree.getValueByPath([ 2, 2, 2 ]),{ value: 11, next: 12 })
            assert.deepStrictEqual(nestedArrayTree.getValueByPath([ 2, 2, 3 ]),{ value: 12, next: [13,14] })
            assert.deepStrictEqual(nestedArrayTree.getValueByPath([ 2, 2, 3, 0 ]),{ value: 13, next: 14 })
            assert.deepStrictEqual(nestedArrayTree.getValueByPath([ 2, 2, 3, 1 ]),{ value: 14, next: undefined })
            assert.deepStrictEqual(nestedArrayTree.getValueByPath([ 2, 2, 3, 2 ]),undefined)
            assert.deepStrictEqual(nestedArrayTree.getValueByPath([ 2, 2, 4 ]),{ value: 15, next: 16 })
            assert.deepStrictEqual(nestedArrayTree.getValueByPath([ 2, 2, 5 ]),{ value: 16, next: undefined })
            assert.deepStrictEqual(nestedArrayTree.getValueByPath([ 2, 2, 6 ]), undefined)
            assert.deepStrictEqual(nestedArrayTree.getValueByPath([ 3 ]),undefined);
        })
    })
    describe.skip('#getChildrenByPath',function(){
        it('should get the right value',function(){
            nestedArrayTree.getChildrenByPath([0]).then(e=>{
                

                //console.log(e)
            })
        })
    });
    describe.skip('#pushChildNode',function(){
        it('should push a child node',function(){
            nestedArrayTree.pushChildNode([0],'hello there').then(e=>{
                //console.log(e)
            })
        })
    })    
})
