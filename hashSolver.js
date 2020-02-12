const _ = require('underscore');
const sha256 = require('js-sha256');

const hashSolver = (function(){

    const decrypt = (string) => {
        console.log('Decoding...');
        console.log(string);
        return string;
    };

    return {
        decrypt
    }

}());

module.exports = hashSolver;
