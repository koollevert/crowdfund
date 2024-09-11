import { Button } from '@nextui-org/react';
import { fetchCampaigns } from '../../actions';
import CardComponent from '../../components/campaignCard';


export default async function CampaignIndex() {
  const campaigns = await fetchCampaigns(); // Call the server-side function

  const renderCampaigns = () => {
    if (campaigns.length === 0) {
      return <div>No campaigns found</div>;
    }

    return (
      <div className="flex flex-col gap-4">
        {campaigns.map((address: string) => (
          <CardComponent
            key={address}
            title={address}
            bodyText="Detailed description of the campaign goes here."
          />
        ))}
      </div>
    );
  };

  return (
    <div className="flex items-center min-h-screen">
      <h3>Open Projects</h3>
      <div>
        {renderCampaigns()}
      </div>
      <div>
        <Button color="primary">
          Add Campaign
        </Button>
      </div>
    </div>
  );
}
