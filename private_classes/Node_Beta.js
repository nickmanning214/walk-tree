
class Node_Beta{
    constructor(path,value, metaData){
        this.path = path;
        this.value = value;
        this.metaData = metaData; //You do need this since you might lose some information depending on the structure of the tree. For example, the value might have a key that is lost when converting to a neutral structure
    }
}
module.exports = Node_Beta;
