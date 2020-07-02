This package provides a Tree class. The tree class converts a generic tree structure to a flat list of "Nodes". Each node has a path (represented as an array), and a value. 

With instances of the tree, you can update the tree with an API (create, edit, delete nodes).

In order to set this all up, you need to configure:

1. Tree instance setup
    1. Describe roots (describeRoots)
        - return an array of values that indicate the roots of the tree. It will internally convert this to an array of nodes.
    2. Describe children (describeChildren)
        - return an array of children in terms of the "parent" argument
2. Tree instance manipulation
    1. Describe add (describeAdd)
        - manually update the structure in terms of the added Node instance. It has been added to the Tree instance     internally but not the structure yet.
            - Note: it's worth questioning what the passed props should be. You can pass the structure but in theory it should be available in the parent scope, or in node.tree.structure.
    2. Describe edit
        - manually edit the structure in terms of the edited Node instance.
    3. Describe remove
        - manually remove a node from the structure in terms of the deleted Node instance.



What needs to be tested:

1. Can a tree create a list of nodes based on describe roots and describe children.
2. Can a tree update the list of nodes based on create, edit, and delete.

So the tests should be:

1. #constructor (test the nodes array)
2. addChildNode, editNode, removeNode (test the nodes array and test the structure)




TODO: Rather than defining each action explicitly, there could be another class that simply rebuilds the entire tree from scratch. You would need a cleanup function to start, then simply another version of describeRoots and describeChildren. Problem is that this might not be that performant. It makes more sense to just define actions to the original structure.
