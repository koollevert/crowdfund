import { Button } from '@nextui-org/react';
import CardComponent from '../../components/campaignCard';
import factory from '../../ethereum/factory'; // Assuming you're interacting with a contract
import Link from 'next/link';

// Async Server Component in Next.js 13 using the app/ directory
export default async function CampaignIndex() {
  let campaigns: string[] = [];

  try {
    // Fetch the deployed campaigns from the Ethereum contract
    campaigns = await factory.methods.getDeployedCampaigns().call();
  } catch (err) {
    console.error('Error fetching campaigns:', err);
  }

  const renderCampaigns = () => {
    if (campaigns.length === 0) {
      return <div>No campaigns found</div>;
    }

    return (
      <div className="flex flex-col gap-4">
        {campaigns.map((address) => (
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
    <div>
      <div className='m-4'>
        <h3>Open Projects</h3>
      </div>

      <div className='flex'>
        <div className="flex-1 min-h-screen">{renderCampaigns()}</div>
        <div className="flex-none ml-auto mb-4">
          <Link href={'/campaigns/new'}>
            <Button color="primary">
                 Add Campaign
            </Button>
          </Link>
        </div>
      </div>
    
    </div>
  );
}

// In the app/ directory, revalidate the page (ISR) after 10 seconds
export const revalidate = 10;
