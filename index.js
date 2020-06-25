const Node = require('./private_classes/Node.js');
const Node_Beta = require('./private_classes/Node_Beta.js');

function arrayequal(array1,array2){
    //https://stackoverflow.com/a/19746771/1763217
    return array1.length === array2.length && array1.every((value, index) => value === array2[index])

}

class Tree{
    constructor(structure,describeRoots,describeChildren){
        this.structure = structure;
        this.describeRoots = describeRoots;
        this.describeChildren = describeChildren;

        this.firstNodes = this.describeRoots(this.structure).map((value,i)=>{
            return new Node_Beta([i],value);
        });

        let nodes = [...this.firstNodes];

        function addChildNodes(node){
            //node is already in the array
            let childNodes = this.describeChildren(node,this.structure).map((value,j,nodes)=>{
                return new Node_Beta([...node.path,j],value);
            });

            childNodes.forEach(node=>{
                nodes.push(node);
                addChildNodes.call(this,node)
            })

        }

        this.firstNodes.forEach(node=>{
            //"node" is already in the array
            addChildNodes.call(this,node);
        })

 
        this.nodes = nodes;


      

    }

    getNodeByPath(pathArr){
        return this.nodes.filter(node=>arrayequal(pathArr,node.path))[0]; // todo "find" instead of filter
    }


    getValueByPath(pathArr){
        return this.getNodeByPath(pathArr).value;
    }

    getChildrenByPath(pathArr){
        let children = [];
        
        let currentChildIndex = 0;
        let currentChildPath = [...pathArr,currentChildIndex]
        let currentChildNode = this.getNodeByPath(currentChildPath);

        while(currentChildNode){
            children.push(this.getValueByPath(currentChildPath));
            childIndex++;
            currentChildPath = [...pathArr,childIndex]
        }
        return children;
    }
    
}






//old
function walk(tree,getFirstNode,getChildNodesOfParentNode, currentNodes = [], parentNode){

    if (typeof parentNode == 'undefined') currentNodes = walk(tree,getFirstNode,getChildNodesOfParentNode,[],getFirstNode(tree,Node))
    else{
        currentNodes.push(parentNode);

        getChildNodesOfParentNode(tree,parentNode,Node).forEach(childNode=>{
            
            currentNodes = walk(tree,getFirstNode,getChildNodesOfParentNode,currentNodes,childNode);
        })
        //rest
    }
    return currentNodes;

}













module.exports = {Tree, walk};
