const assert = require('assert');
const letterPyramidFlat = require('./letterPyramidFlat.js');
const letterPyramidNested = require('./letterPyramidNested.js');
const path = require('path');

const walkFlatObject = require('../implementations/walkFlatObject.js');
const walkNestedObject = require('../implementations/walkNestedObject.js');
const walkDirectory = require('../implementations/walkDirectory.js');

let flat = walkFlatObject(letterPyramidFlat,'parent');
let nested = walkNestedObject(letterPyramidNested);
let directory = walkDirectory(__dirname,'directory');

let customStructure = require('./custom.js');

const _Node = require('../private_classes/Node.js')
const _Node_Beta = require('../private_classes/Node_Beta.js')

const fs = require('fs');

function getFirstNode(structure,Node){
    return new Node({path:'00'},structure[0][0]);
}

function getChildNodesFromTreeAndParentNode(structure,parentNode,Node){
    
    
    const pathToIndex = {
        '00':1,
        '10':2,
        '11':3,
        '12':4
    };
    
    const index = pathToIndex[parentNode.metaData.path];
    if (!index) return [];
    const children = structure[index].map((value,i)=>new Node({path:`${index}${i}`},structure[index][i]));
    
    return children;

}





const Tree = require('../index.js').Tree;


describe('walkFlatObject',function(){
    it('should walk the tree',function(){
        
        assert.deepEqual(
            flat.map(n=>`${n.metaData.key}${n.value.vowel?'vowel':''}${n.value.parent?`parent:${n.value.parent}`:''}`).sort(),
            [ 'avowel',
                'bparent:a',
                'cparent:a',
                'dparent:b',
                'evowelparent:b',
                'fparent:b',
                'gparent:b',
                'hparent:c',
                'ivowelparent:c',
                'jparent:c',
                'kparent:c' ],
                
        )
    })
})

describe('walkNestedObject',function(){
    it('should walk the tree',function(){

        assert.deepEqual(
            nested.map(n=>`${n.metaData.key}${n.value.vowel?'vowel':''}${n.metaData.parent?`parent:${n.metaData.parent}`:''}`).sort(),
            [ 'avowel',
                'bparent:a',
                'cparent:a',
                'dparent:b',
                'evowelparent:b',
                'fparent:b',
                'gparent:b',
                'hparent:c',
                'ivowelparent:c',
                'jparent:c',
                'kparent:c' ]
        )
    })

});

describe('walkDirectory',function(){
    it('should walk the directory',function(){

        //TO DO: Sort to guarantee equality (have to think through how sort works here though)

        assert.deepEqual(directory.map(file=>`${path.join(file.metaData.parentPath,file.value)}`),[ 
            path.join(__dirname,'directory'),
            path.join(__dirname,'directory/directory1'),
            path.join(__dirname,'directory/directory1/file1.md'),
            path.join(__dirname,'directory/directory1/file2.json'),
            path.join(__dirname,'directory/file1.txt'),
            path.join(__dirname,'directory/file2.js')
        ]);
    })
})

describe('Tree',function(){
    describe('directory',function(){
        function describeRoots(structure){
            return [structure];
        }
        function describeChildren(parentNode,structure){
            if (fs.lstatSync(parentNode.value).isDirectory()){
                return fs.readdirSync(parentNode.value).map(n=>path.join(parentNode.value,n));
            }
            else return [];
        }
        const directoryTree = new Tree(__dirname,describeRoots,describeChildren);
        assert(directoryTree.getValueByPath([0])===__dirname);
    });

    describe('letter tree',function(){
        
        
        function describeRootsNested(structure){
            return Object.keys(structure).map(key=>structure[key]);
        }
        function describeChildrenNested(parentNode,structure){
            return typeof parentNode.value.children !== 'undefined'? Object.keys(parentNode.value.children).map(key=>parentNode.value.children[key]) : [];
           
        }
        const nestedTree = new Tree(letterPyramidNested,describeRootsNested,describeChildrenNested)
        

        function describeRootsFlat(structure){
            //returns the value
            //return [structure.a] // hardcoded. Also check for obj with no "parent" attribute.
            //console.log( [structure.a],Object.keys(structure).filter(key=>!structure[key].parent).map(key=>structure[key]))
            return Object.keys(structure).filter(key=>!structure[key].parent).map(key=>structure[key]);
        }

        function describeChildrenFlat(parentNode,structure){
            //returns the array of values
            const values =  Object.keys(structure).map(key=>structure[key]);
            return values.filter(value=>structure[value.parent] == parentNode.value);
        }

        const flatTree = new Tree(letterPyramidFlat,describeRootsFlat,describeChildrenFlat)



        describe('nodes',function(){
            it('should show the nodes',function(){
                let nestedNodes = nestedTree.nodes; //replace with nestedTree
                assert(Array.isArray(nestedNodes));
                assert(nestedNodes.every(node=>{
                    return node instanceof _Node_Beta;
                }));

                let flatNodes = flatTree.nodes;
                assert(Array.isArray(flatNodes));
                assert(flatNodes.every(node=>{
                    return node instanceof _Node_Beta;
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
                assert.deepEqual(flatPaths,nestedPaths);

              
                
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
                    
                ]);
    
                })
            })

    })



    describe('custom structure', function(){
        function describeRoots(structure){
            return [structure[0][0]];
        }
        
        function describeChildren(parentNode,structure){
            function arr_equal(array1,array2){
                return array1.length === array2.length && array1.every(function(value, index) { return value === array2[index]})
            }
        
            if (arr_equal(parentNode.path, [0])){ 

                return structure[1];
            }
            else if (arr_equal(parentNode.path, [0,0])){
                return structure[2];
            }
            else if (arr_equal(parentNode.path, [0,1])){
                return structure[3];
            }
            else if (arr_equal(parentNode.path,[0,2])){
                return structure[4]
            }
            else return [];
        }
        const customTree = new Tree(customStructure,describeRoots,describeChildren)
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
