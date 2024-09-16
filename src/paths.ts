
const paths ={
    CampaignIndex(){
        return '/';
    },
    CampaignShow(campaignSlug: string){
        return `/campaigns/${campaignSlug}`;
    },
    CampaignNew(){
        return 'campaigns/new';
    },
};

export default paths;