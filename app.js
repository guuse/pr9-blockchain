const fetch = require('node-fetch');
const hashSolver = require('./hashSolver');

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
                blockInfo.hash = res.blockchain.hash;
                blockInfo.from = res.blockchain.data[0].from;
                blockInfo.to = res.blockchain.data[0].to;
                blockInfo.amount = res.blockchain.data[0].amount;
                blockInfo.dataTimestamp = res.blockchain.data[0].timestamp;
                blockInfo.currentTimestamp = res.timestamp;
                blockInfo.nonce = res.blockchain.nonce;
                blockInfo.transactions = res.transactions;
                createHashString(blockInfo);
            }
        )
        .catch(function (error) {
            console.log('Error: ', error)
        });
}

function createHashString(blockInfo) {
    blockInfoString = (blockInfo.from + blockInfo.to + blockInfo.amount + blockInfo.dataTimestamp + blockInfo.currentTimestamp);

    if (hashString !== null) {
        nonceMining(blockInfo, hashSolver.decrypt(blockInfo.hash + blockInfoString + blockInfo.nonce), 1);
    }
    else {
        console.log('De hash kon niet goed gecreëerd worden');
    }
}

function nonceMining(blockInfo, hash, nonce) {
    let blockTransactionString = blockInfo.transactions[0].from + blockInfo.transactions[0].to + blockInfo.transactions[0].amount + blockInfo.transactions[0].timestamp + blockInfo.currentTimestamp;

    let hashString = hash + blockTransactionString + nonce;
    let minedHash = hashSolver.decrypt(hashString);

    if (minedHash.startsWith('0000')) {
        console.log('Success on: ' + nonce);
        console.log('Hash: ' + minedHash);
        postToChain(nonce);
    } else {
        console.log('Nonce ' + nonce + ' not suitable');
        nonce = nonce + 1;
        nonceMining(blockInfo, hash, nonce)
    }
}

function postToChain(nonce) {
    let body = {
        user: 'Guus 0912071',
        nonce: nonce
    };

    console.log(body);

    fetch('https://programmeren9.cmgt.hr.nl:8000/api/blockchain', {
        method: 'post',
        body:    JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },
    })
    .then(res => res.json())
    .then(json => console.log(json));
}

