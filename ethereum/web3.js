// import {Web3} from 'web3';

// // import { ethers } from "ethers";

// let web3;

// if(typeof window !=='undefined' && typeof window.web3 !=='undefined'){
//     // in browser en metamask injected web3
//     web3= new Web3(window.web3.currentProvider);

// }else{
//     //other case, on server or user not running metamsk
//     const provider = new Web3.providers.HttpProvider(
//         'https://sepolia.infura.io/v3/b3be9208b48349fe9f9aa63ac4cf8b68'
//     );
//     web3 = new Web3(provider)


// }
// export default web3;


// let provider;

// if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
//     // In browser, MetaMask injected provider (or any wallet with window.ethereum)
//     provider = new ethers.providers.Web3Provider(window.ethereum);
// } else {
//     // On server or if MetaMask is not installed
//     provider = new ethers.providers.JsonRpcProvider('https://sepolia.infura.io/v3/b3be9208b48349fe9f9aa63ac4cf8b68');
// }

// export default provider;


import {Web3} from 'web3';

let web3;

if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
    // Modern browsers with MetaMask or other Ethereum providers
    window.ethereum.request({ method: 'eth_requestAccounts' }); // Request access to accounts
    web3 = new Web3(window.ethereum);
} else {
    // Running on the server or no MetaMask
    const provider = new Web3.providers.HttpProvider(
        'https://sepolia.infura.io/v3/b3be9208b48349fe9f9aa63ac4cf8b68'
    );
    web3 = new Web3(provider);
}

export default web3;
