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
