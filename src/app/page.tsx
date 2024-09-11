// 'use client';

// import React, { Component } from 'react';
// import factory from "../../ethereum/factory"; 
// import { Card } from 'semantic-ui-react';

// export default class CampaignIndex extends Component {
//   static async getInitialProps(){
//     const campaigns = await factory.methods.getDeployedCampaigns().call();
//     console.log(campaigns)
//     return {campaigns};
//   }

//   renderCampigns(){
//     const items=this.props.campaigns.map(address=>{
//       return{
//         header: address,
//         description: <a>View Campaign</a>,
//         fluid: true
//       };
//     });
//     return <Card.Group items={items}/>;
//   }
  
//   render() {
//     return <div>{this.renderCampigns()}</div>;
//   }
// }

// 'use client';

// import React, { Component } from 'react';
// import factory from "../../ethereum/factory"; 
// import { Card } from 'semantic-ui-react';

// export default class CampaignIndex extends Component {
//   static async getInitialProps() {
//     try {
//       const campaigns = await factory.methods.getDeployedCampaigns().call();
//       console.log('Fetched campaigns:', campaigns);
//       return { campaigns };
//     } catch (err) {
//       console.error('Error fetching campaigns:', err);
//       return { campaigns: [] };
//     }
//   }

//   renderCampigns() {
//     if (!this.props.campaigns || this.props.campaigns.length === 0) {
//       return <div>No campaigns found</div>;
//     }

//     const items = this.props.campaigns.map(address => {
//       return {
//         header: address,
//         description: <a>View Campaign</a>,
//         fluid: true,
//       };
//     });

//     return <Card.Group items={items} />;
//   }
  
//   render() {
//     return <div>{this.renderCampigns()}</div>;
//   }
// }
// src/app/page.tsx (Server Component by default)
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


