const _ = require('underscore');
const sha256 = require('js-sha256');

let asciiArray          = [];
let singleNumberArray   = [];
let splicedArray        = [];
let finalArray          = [];
let finalString         = String;

const hashSolver = (function () {
    const decrypt = (string) => {
        resetData();
        asciiConverter(removeSpaces(string));
        singleNumbers(asciiArray);
        spliceAndFill(singleNumberArray);
        finalArray = mergeArrays(splicedArray);
        finalString = arrayToString(finalArray);
        return hasher(finalString);
    };

    const resetData = () => {
        asciiArray          = [];
        singleNumberArray   = [];
        splicedArray        = [];
        finalArray          = [];
        finalString         = '';
    };

    const removeSpaces = (string) => {
        return string.replace(/\s+/g, '');
    };

    const asciiConverter = (string) => {
        for (let i = 0; i < string.length; i++) {
            for (let character of string[i]) {
                if (isNaN(character)) {
                    character = character.charCodeAt(0);
                    asciiArray.push(character);
                } else {
                    asciiArray.push(character);
                }
            }
        }
        return asciiArray;
    };

    const singleNumbers = (array) => {
        array.forEach((value, index) => {
            Array.from(value.toString()).forEach((char) => {
                singleNumberArray.push(parseInt(char))
            })
        });
        return singleNumberArray;
    };

    const spliceAndFill = (array) => {
        _.chunk(array, 10).forEach(function (chunk) {
            if (chunk.length !== 10) {
                let diff = 10 - chunk.length;
                for (let i = 0; i < diff; i++) {
                    chunk.push(i);
                }
            }
            splicedArray.push(chunk);
        });
        return splicedArray;
    };

    const mergeArrays = (arrayList) => {
        if (arrayList.length === 1) {
            return arrayList[0];
        }

        let mergedArray = [];

        for (let i = 0; i < 10; i++) {
            mergedArray.push((arrayList[0][i] + arrayList[1][i]) % 10);
        }

        arrayList.splice(0, 2);
        arrayList.unshift(mergedArray);

        return mergeArrays(arrayList);
    };

    const arrayToString = (array) => {
        let string = array.join();
        return string.replace(/,/g, '');
    };

    const hasher = (string) => {
        return sha256(string);
    };

    return {
        decrypt,
        asciiConverter,
        singleNumbers,
        spliceAndFill,
        mergeArrays
    }

}());

module.exports = hashSolver;
