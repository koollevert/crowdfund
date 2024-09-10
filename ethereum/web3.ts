import {Web3} from 'web3';

let web3;

if(typeof window !=='undefined' && typeof window.web3 !=='undefined'){
    // in browser en metamask injected web3
    web3= new Web3(window.web3.currentProvider);

}else{
    //other case, on server or user not running metamsk
    const provider = new Web3.providers.HttpProvider(
        'https://sepolia.infura.io/v3/b3be9208b48349fe9f9aa63ac4cf8b68'
    );
    web3 = new Web3(provider)


}
export default web3;