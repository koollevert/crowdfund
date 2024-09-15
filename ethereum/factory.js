import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const factory = new web3.eth.Contract(
    CampaignFactory.interface,  // In Web3.js, we use `abi` instead of `interface`
    '0xb0FF9fB7f9e68E562FA9bb9A80bf2761cf9Aa571'
);

export default factory;
