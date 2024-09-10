import web3 from './web3';
import CampaignFcatory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
    CampaignFcatory.interface,
    '0x3E76aadd570De10C8517DB71E112215834EA8FA5'
);

export default instance;