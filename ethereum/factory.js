import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const factory = new web3.eth.Contract(
    CampaignFactory.interface,  // In Web3.js, we use `abi` instead of `interface`
    '0x3E76aadd570De10C8517DB71E112215834EA8FA5'
);

export default factory;
