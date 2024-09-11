// // app/page.tsx (or your relevant file)
// import React from 'react';
// // import { Card } from 'semantic-ui-react';
// import factory from '../../ethereum/factory';
// import CampaignCard from '../../components/campaignCard';
// import { Button } from '@nextui-org/react';
// import CardComponent from '../../components/campaignCard';

// // Server-side function
// // Add `use server` directive
// export async function fetchCampaigns() {
//   'use server'; // This tells Next.js that this function should be run on the server
//   try {
//     const campaigns = await factory.methods.getDeployedCampaigns().call();
//     return campaigns;
//   } catch (err) {
//     console.error('Error fetching campaigns:', err);
//     return [];
//   }
// }

// // Server Component
// export default async function CampaignIndex() {
//   // const campaigns = await fetchCampaigns(); // Call the server-side function

//   // const renderCampaigns = () => {
//   //   if (campaigns.length === 0) {
//   //     return <div>No campaigns found</div>;
//   //   }

//   //   return (
//   //     <Card.Group>
//   //       {campaigns.map((address: string) => (
//   //         <CampaignCard key={address} address={address} />
//   //       ))}
//   //     </Card.Group>
//   //   );
//   // };

//   return(

//     <div className="flex justify-center items-center min-h-screen">
//       <CardComponent
//         title="NextUI"
//         subtitle="nextui.org"
//         imageSrc="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
//         bodyText="Make beautiful websites regardless of your design experience."
//       />
//     </div>

//   ); 
// }
// app/page.tsx (or the relevant file)
import React from 'react';
import { fetchCampaigns } from '../../actions';
import CardComponent from '../../components/campaignCard';


export default async function CampaignIndex() {
  const campaigns = await fetchCampaigns(); // Call the server-side function

  const renderCampaigns = () => {
    if (campaigns.length === 0) {
      return <div>No campaigns found</div>;
    }

    return (
      <div className="flex flex-wrap gap-4">
        {campaigns.map((address: string) => (
          <CardComponent
            key={address}
            title={address}
            subtitle="Campaign Subtitle" // Update this if you have a different subtitle
            imageSrc="https://avatars.githubusercontent.com/u/86160567?s=200&v=4" // Update if necessary
            bodyText="Detailed description of the campaign goes here."
          />
        ))}
      </div>
    );
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      {renderCampaigns()}
    </div>
  );
}
