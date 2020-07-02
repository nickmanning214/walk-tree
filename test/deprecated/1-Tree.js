const assert = require('assert');
const path = require('path');
const Tree = require('../../Tree.js').Tree;

let customStructure = require('../structures/custom.js');

const _Node_Beta = require('../../private_classes/Node_Beta.js');
const Node3 = require('../../private_classes/Node3.js');

const flatObject = require('../tree-instances/flatObject.js');




describe('Tree',function(){






        const directoryTree = require('../tree-instances/directory.js');
        const nestedObjectTree = require('../tree-instances/nestedObject.js');
        const flatObjectTree = require('../tree-instances/flatObject.js');
        const customTree = require('../tree-instances/custom.js');
        

        describe('#getValueByPath',function(){
            
            it('should return the (first) root value',function(){
                assert(directoryTree.getValueByPath([0])===path.join(__dirname,'structures/directory'));
                assert.deepStrictEqual(nestedObjectTree.getValueByPath([0]),nestedObjectTree.structure.a)
                //assert(nestedObjectTree.getValueByPath([0]) == nestedObjectTree.structure.a) This happens to work. Should it?
                assert.deepStrictEqual(flatObjectTree.getValueByPath([0]),{key:'a',value:flatObjectTree.structure.a});
                assert(customTree.getValueByPath([0])===customTree.structure[0][0])

            });

            it('should return the first child of the first root value',function(){
                assert.deepStrictEqual(nestedObjectTree.getValueByPath([0,0]),nestedObjectTree.structure.a.children.b)
                
                assert.deepStrictEqual(flatObjectTree.getValueByPath([0,0]),{key:'b',value:flatObjectTree.structure.b})

            });



        })

        describe('#getChildrenByPath',function(){
            it('should return the children',function(){
                //console.log(customTree.getValueByPath([0]))
                //console.log(customTree.getChildrenByPath([0]))
                //assert(directoryTree.getChildrenByPath([0]));
            })
        });

        describe('#pushChildNode',function(){
            const clone = Object.assign( {}, flatObjectTree ); 
            Object.setPrototypeOf( clone, Tree.prototype );
            clone.nodes = [...flatObjectTree.nodes];
            //let clone = Object.assign( Object.create( Object.getPrototypeOf(flatObjectTree)), flatObjectTree)
            clone.pushChildNode([0],{
                vowel:false,
                parent:'a'
            },function(structure,parentNode,value){
                structure['l'] = value;
            });
            //it's a problem that the "key" is lost, because this needs to be used in "describe push", etc
        })
       
        

        
        

        



        describe('nodes',function(){
            it('should show the nodes',function(){
                let nestedNodes = nestedObjectTree.nodes; //replace with nestedTree
                
                assert(Array.isArray(nestedNodes));
                assert(nestedNodes.every(node=>{
                    return node instanceof _Node_Beta;
                }));
                 

                
                let flatNodes = flatObjectTree.nodes;
                
                assert(Array.isArray(flatNodes));
                assert(flatNodes.every(node=>{
                    return node instanceof Node3;
                }));


                

                const pathsHardCoded = [
                    [0],//a
                    [0,0],//a.b
                    [0,0,0],//a.b.d
                    [0,0,1],//a.b.e
                    [0,0,2],//a.b.f
                    [0,0,3],//a.b.g
                    [0,1],//a.c
                    [0,1,0],//a.c.h
                    [0,1,1],//a.c.i
                    [0,1,2],//a.c.j
                    [0,1,3]//a.c.k
                    
                ];
                const nestedPaths = nestedNodes.map(node=>{
                    return node.path
                });


                const flatPaths = flatNodes.map(node=>{
                    return node.path
                });

                

                assert.deepEqual(pathsHardCoded,nestedPaths);
                assert.deepEqual(flatPaths,nestedPaths); //"Try this idk" still there even though it's cloned...


                /*
                assert.deepEqual(flatNodes.map(node=>{
                    return node.value
                }),[
                    {//a
                        vowel:true
                    },
                    {//b
                        vowel:false,
                        parent:'a'
                    },
                    {//d
                        vowel:false,
                        parent:'b'
                    },
                    {//e
                        vowel:true,
                        parent:'b'
                    },
                    {//f
                        vowel:false,
                        parent:'b'
                    },
                    {//g
                        vowel:false,
                        parent:'b'
                    },
                    {//c
                        vowel:false,
                        parent:'a'
                    },
                    {//h
                        vowel:false,
                        parent:'c'
                    },
                    {//i
                        vowel:true,
                        parent:'c'
                    },
                    {//j
                        vowel:false,
                        parent:'c'
                    },
                    {//k
                        vowel:false,
                        parent:'c'
                    }
                    
                ]);*/
    
                })
            })




    describe('custom structure', function(){
        describe('nodes',function(){
            it('should show the nodes',function(){
              
                let nodes = customTree.nodes;
                assert(Array.isArray(nodes));
                assert(nodes.every(node=>{
                    return node instanceof _Node_Beta;
                }));
                assert.deepEqual(nodes.map(node=>{
                    return node.path
                }),[
                    [0],
                    [0,0],
                    [0,0,0],
                    [0,0,1],
                    [0,0,2],
                    [0,1],
                    [0,1,0],
                    [0,1,1],
                    [0,1,2],
                    [0,2],
                    [0,2,0],
                    [0,2,1],
                    [0,2,2],
                    [0,2,3]
                ]);
    
                assert.deepEqual(nodes.map(node=>{
                    return node.value
                }),[
                    '1','1.1','1.1.1','1.1.2','1.1.3','1.2','1.2.1','1.2.2','1.2.3','1.3','1.3.1','1.3.2','1.3.3','1.3.4'
                ]);
    
    
    
                assert.deepEqual('a','a')
            })
        })
    })


    
})
