// import web3 from './web3';
// import CampaignFcatory from './build/CampaignFactory.json';

// const factory = new web3.eth.Contract(
//     CampaignFcatory.interface,
//     '0x3E76aadd570De10C8517DB71E112215834EA8FA5'
// );

// export default factory;


// import { ethers } from 'ethers';
// import provider from './web3'; // This is the provider we created earlier using ethers.js
// import CampaignFactory from './build/CampaignFactory.json';

// // Define the contract address
// const factoryAddress = '0x3E76aadd570De10C8517DB71E112215834EA8FA5';

// // Create an instance of the contract using ethers.js
// const factory = new ethers.Contract(
//     factoryAddress,
//     CampaignFactory.interface, // Use the ABI from the compiled JSON file
//     provider // Use the provider created in the 'web3' file
// );

// export default factory;


import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const factory = new web3.eth.Contract(
    CampaignFactory.interface,  // In Web3.js, we use `abi` instead of `interface`
    '0x3E76aadd570De10C8517DB71E112215834EA8FA5'
);

export default factory;
