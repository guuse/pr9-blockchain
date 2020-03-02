const chai = require("chai");
const expect = chai.expect;
const hashSolver = require('../hashSolver');
const expectations = require('./expectations');

describe('Unit tests for checking the Mod10 algorithm', function() {
    describe("String to ASCII and numbers as string", function () {
        it('should convert string to ASCII and keep numbers as string', function () {
            expect(hashSolver.asciiConverter(expectations.asciiStart)).to.deep.equal(expectations.asciiExpect);
        })
    });

    describe("Convert numbers to integers, and separate ASCII numbers", function () {
        it('should be converted to single digits', function () {
            expect(hashSolver.singleNumbers(expectations.asciiSingleStart)).to.deep.equal(expectations.asciiSingleExpect);
        })
    });

    describe("Splices and filles arrays to 10 length", function () {
        it('should be spliced and filled to 10', function () {
            expect(hashSolver.spliceAndFill(expectations.spliceAndFillStart)).to.deep.equal(expectations.spliceAndFillExpect);
        })
    });

    describe("mergeArrays", function () {
        it('mergeArrays', function () {
            expect(hashSolver.mergeArrays(expectations.mergeArraysStart)).to.deep.equal(expectations.mergeArraysExpect);
        })
    });
});
