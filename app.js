const fetch = require('node-fetch');
const hashSolver = require('./hashSolver');
const sha256 = require('js-sha256');

let hashString;

init();

function init() {
    console.log('App initiated :)');
    nextBlockInfo();
}

function nextBlockInfo() {
    let url = 'https://programmeren9.cmgt.hr.nl:8000/api/blockchain/next';
    let blockInfo = {};

    fetch(url)
        .then(res => res.json())
        .then(res => {
                blockInfo.hash              = res.blockchain.hash;
                blockInfo.from              = res.blockchain.data[0].from;
                blockInfo.to                = res.blockchain.data[0].to;
                blockInfo.amount            = res.blockchain.data[0].amount;
                blockInfo.dataTimestamp     = res.blockchain.data[0].timestamp;
                blockInfo.currentTimestamp  = res.blockchain.timestamp;
                blockInfo.nonce             = res.blockchain.nonce;
                createHashString(blockInfo);
            }
        )
        .catch(function (error) {
            console.log('er gaat iets mis: ', error)
        });
}

function createHashString (blockInfo) {
    blockInfoString = (blockInfo.hash + blockInfo.from + blockInfo.to + blockInfo.amount + blockInfo.dataTimestamp + blockInfo.currentTimestamp + blockInfo.nonce);
    if (hashString !== null) {
        console.log(hashSolver.decrypt(blockInfoString));
    }
    else {
        console.log('De hash kon niet goed gecreëerd worden');
    }
}
