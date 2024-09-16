import Campaign from '../../../../ethereum/campaign';
interface CampaignShowPageProps {
    params: {
      address: string;
    };
  }
  
export default async function CampaignShow({params}:CampaignShowPageProps){
    const campaign=Campaign(params.address);
    const summary= await campaign.methods.getSummary().call();
    console.log(summary);
    return(
        <div>Show</div>
    )
}