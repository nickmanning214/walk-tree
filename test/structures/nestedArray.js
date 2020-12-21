//Concept: An array is a child of the previous value.
//So the tree is 1,2->[3,4],5->[6,7,8->[9,10,11,12->[13,14],15,16]]
/*
1
2
    3
    4
5
    6
    7
    8
        9
        10
        11
        12
            13
            14
        15
        16
*/


module.exports = [
    1,
    2,
        [3,4],
    5,
        [6,7,8,
            [9,10,11,12,[13,14],15,16
        ]
    ]
];
