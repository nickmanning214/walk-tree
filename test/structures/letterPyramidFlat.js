module.exports = function(){
    return {
        'a':{
            vowel:true
        },
        'b':{
            vowel:false,
            parent:'a'
        },
        'c':{
            vowel:false,
            parent:'a'
        },
        'd':{
            vowel:false,
            parent:'b'
        },
        'e':{
            vowel:true,
            parent:'b'
        },
        'f':{
            vowel:false,
            parent:'b'
        },
        'g':{
            vowel:false,
            parent:'b'
        },
        'h':{
            vowel:false,
            parent:'c'

        },
        'i':{
            vowel:true,
            parent:'c'
        },
        'j':{
            vowel:false,
            parent:'c'
        },
        'k':{
            vowel:false,
            parent:'c'
        }
    }
}
