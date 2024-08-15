const HDWalletProvider = require('@truffle/hdwallet-provider');
const {Web3} = require('web3');
// const { abi, bytecode } = require('./build/Inbox.json');
// const compiledFactory = require('../build/CampaignFactory.json');
const compiledFactory = require('C:/Users/joshu/Desktop/crowdfund/ethereum/build/CampaignFactory.json');


const provider = new HDWalletProvider(
    'saddle connect tumble beyond impose siren spin brain crumble chief grief dice',
    'https://sepolia.infura.io/v3/b3be9208b48349fe9f9aa63ac4cf8b68'
);
// provider.engine._blockTracker._pollingInterval = 8000; // Set polling interval to 8 seconds

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log('Attempting to deploy from Account', accounts[0]);

    const result = await new web3.eth.Contract(compiledFactory.interface)
        .deploy({ data: bytecode })
        .send({ gas: '1000000', from: accounts[0] });
    
    // const result = await new web3.eth.Contract(compiledFactory.interface)
    //     .deploy({ data: '0x' + compiledFactory.bytecode }) // add bytecode
    //     .send({ from: accounts[0] }); // remove gas

    console.log('Contract deployed to', result.options.address);
    provider.engine.stop();  // Stop the provider engine
};

deploy();



// const HDWalletProvider = require('@truffle/hdwallet-provider');
// const {Web3} = require('web3');
// // const { abi, bytecode } = require('./build/Inbox.json');
// // const { abi, bytecode } = require('C:\Users\joshu\Desktop\GdApp\artifacts\contracts\Lottery.sol\lottery.json');
// const compiledFactory = require('C:/Users/joshu/Desktop/crowdfund/ethereum/build/CampaignFactory.json');


// const provider = new HDWalletProvider(
//     'saddle connect tumble beyond impose siren spin brain crumble chief grief dice',
//     'https://sepolia.infura.io/v3/b3be9208b48349fe9f9aa63ac4cf8b68'
// );

// const web3 = new Web3(provider);

// const deploy = async () => {
//     const accounts = await web3.eth.getAccounts();
//     console.log('Attempting to deploy from Account', accounts[0]);

//     const result = await new web3.eth.Contract(abi)
//         .deploy({ data: bytecode })
//         .send({ gas: '1000000', from: accounts[0] });
//     console.log(abi);
//     console.log('Contract deployed to', result.options.address);
//     provider.engine.stop();  // Stop the provider engine
// };

// deploy();