const Node = require('./private_classes/Node.js');
const Node_Beta = require('./private_classes/Node_Beta.js');

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


    flatten(currentNodes = [], parentNode){ //old "walk"
    
        if (typeof parentNode == 'undefined') currentNodes = this.flatten([],this.getFirstNode(this.structure,Node))
        else{
            currentNodes.push(parentNode);
    
            this.getChildNodesOfParentNode(this.structure,parentNode,Node).forEach(childNode=>{
                
                currentNodes = this.flatten(currentNodes,childNode);
            })
            //rest
        }
        return currentNodes;
    
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
