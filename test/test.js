const assert = require('assert');
const walk = require('../index.js')
const letterPyramidFlat = require('./letterPyramidFlat.js');
const letterPyramidNested = require('./letterPyramidNested.js');
const path = require('path');
const fs = require('fs');

const walkFlatObject = require('../walkFlatObject.js');
const walkNestedObject = require('../walkNestedObject.js');
const walkDirectory = require('../walkDirectory.js');

let flat = walkFlatObject(letterPyramidFlat,'parent');
let nested = walkNestedObject(letterPyramidNested);
let directory = walkDirectory(__dirname,'directory');






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
