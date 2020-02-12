const _ = require('underscore');
const sha256 = require('js-sha256');

let asciiArray          = [];
let singleNumberArray   = [];
let splicedArray        = [];
let finalString         = String;

const hashSolver = (function () {
    const decrypt = (string) => {
        console.log('Decoding: ' + string);
        asciiConverter(removeSpaces(string));
        singleNumbers();
        spliceAndFill();
        finalString = arrayToString(mergeArrays(splicedArray));
        return hasher(finalString);
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
    };

    const singleNumbers = () => {
        asciiArray.forEach((value, index) => {
            Array.from(value.toString()).forEach((char) => {
                singleNumberArray.push(parseInt(char))
            })
        });
        return singleNumberArray;
    };

    const spliceAndFill = () => {
        _.chunk(singleNumberArray, 10).forEach(function (chunk) {
            if (chunk.length !== 10) {
                let diff = 10 - chunk.length;
                for (let i = 0; i < diff; i++) {
                    chunk.push(i);
                }
            }
            splicedArray.push(chunk);
        });
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
        decrypt
    }

}());

module.exports = hashSolver;
