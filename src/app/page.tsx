import React from 'react';
import factory from '../../ethereum/factory';
import { Card } from 'semantic-ui-react';

const CampaignIndex = async () => {
  let campaigns = [];

  try {
    campaigns = await factory.methods.getDeployedCampaigns().call();
  } catch (err) {
    console.error('Error fetching campaigns:', err);
  }

  // const renderCampaigns = () => {
  //   if (campaigns.length === 0) {
  //     return <div>No campaigns found</div>;
  //   }

  //   const items = campaigns.map((address: string) => ({
  //     header: address,
  //     description: <a>View Campaign</a>,
  //     fluid: true,
  //   }));

  //   return <div>items={items}</div>;
  // };

  return <div>{campaigns[0]}</div>;
};

export default CampaignIndex;


