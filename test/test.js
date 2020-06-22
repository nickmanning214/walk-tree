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
let customTree = new Tree(customStructure,getFirstNode,getChildNodesFromTreeAndParentNode)
console.log(customTree.flatten());

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
    describe('flatten',function(){
        it('should flatten',function(){
            assert.deepEqual('a','a')
        })
    })
})
