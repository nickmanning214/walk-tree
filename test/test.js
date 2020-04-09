const assert = require('assert');
const walk = require('../index.js')
const letterPyramidFlat = require('./letterPyramidFlat.js');
const letterPyramidNested = require('./letterPyramidNested.js');
const path = require('path');
const fs = require('fs');

let flat = walk(letterPyramidFlat,(tree,Node)=>new Node({key:'a'},tree.a),(tree,parentNode,Node)=>{
    //Here Calculate children from entire tree or from parentNode
    const allTreeKeys = Object.keys(tree);
    const keysToNode = key=>new Node({key},tree[key]);
    const allTreeNodes = allTreeKeys.map(keysToNode)
    return allTreeNodes.filter(node=>node.value.parent==parentNode.metaData.key);
});

let nested = walk(letterPyramidNested,(tree,Node)=>new Node({key:'a'},tree.a),(tree,parentNode,Node)=>{
    const allChildKeys = typeof parentNode.value.children !== 'undefined'? Object.keys(parentNode.value.children) : [];
    const keysToNode = key=>new Node({key,parent:parentNode.metaData.key},parentNode.value.children[key]);
    return allChildKeys.map(keysToNode);
});


let directory = walk('directory',(tree,Node)=>new Node({parentPath:__dirname},tree),(tree,parentNode,Node)=>{

    const dirName = path.join(parentNode.metaData.parentPath,parentNode.value);
    if (fs.lstatSync(dirName).isDirectory()){
        return fs.readdirSync(dirName).map(fileName=>new Node({parentPath:dirName},fileName))
    }
    else return [];
})



describe('collection',function(){
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
})

describe('directory',function(){
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
