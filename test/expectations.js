const expectations = (function() {

    const asciiStart = "test123";
    const asciiExpect = [ 116, 101, 115, 116, "1", "2", "3" ];

    const asciiSingleStart = asciiExpect;
    const asciiSingleExpect = [1,1,6,1,0,1,1,1,5,1,1,6,1,2,3];

    const spliceAndFillStart = asciiSingleExpect;
    const spliceAndFillExpect = [
            [ 1, 1, 6, 1, 0, 1, 1, 1, 5, 1 ],
            [ 1, 6, 1, 2, 3, 0, 1, 2, 3, 4 ]
        ];

    const mergeArraysStart = spliceAndFillExpect;
    const mergeArraysExpect = [ 2, 7, 7, 3, 3, 1, 2, 3, 8, 5 ];

    return {
        asciiStart,
        asciiExpect,
        asciiSingleStart,
        asciiSingleExpect,
        spliceAndFillStart,
        spliceAndFillExpect,
        mergeArraysStart,
        mergeArraysExpect
    }
}());

module.exports = expectations;
