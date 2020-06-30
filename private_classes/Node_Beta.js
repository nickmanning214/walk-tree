
class Node_Beta{
    constructor(path,value, metaData){
        this.path = path;
        this.value = value;
        //this.metaData = metaData; 
        //You do need this since you might lose some information depending on the structure of the tree. For example, the value might have a key that is lost when converting to a neutral structure
        //Then again, it might be better just to redefine it as a multilayers object like {key:___,value:____}
    }
}
module.exports = Node_Beta;
