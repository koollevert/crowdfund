import Campaign from '../../../../ethereum/campaign';
interface CampaignShowPageProps {
    params: {
      address: string;
    };
  }
  
export default async function CampaignShow({params}:CampaignShowPageProps){
    async function fetchData() {
        const campaign = Campaign(params.address);
        const summary = await campaign.methods.getSummary().call();
    
        //translation layer
        return {
          minimumContribution: summary[0],
          balance: summary[1],
          requestCount: summary[2],
          approversCount: summary[3],
          manager: summary[4],
        };
      }

    return(
        <div>Show</div>
    )
}