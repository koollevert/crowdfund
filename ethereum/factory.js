import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const factory = new web3.eth.Contract(
    CampaignFactory.interface,  // In Web3.js, we use `abi` instead of `interface`
    '0x1911B4e5b77e904fD0c8e3221beEB3830D702A15'
);

export default factory;
