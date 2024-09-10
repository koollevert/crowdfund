'use client';

import React, { Component } from 'react';
import factory from "../../ethereum/factory"; 

export default class CampaignIndex extends Component {
  // Use componentDidMount to fetch data, not componentDidCatch
  async componentDidMount() {
    const campaigns = await factory.methods.getDeployedCampaigns().call();
    console.log(campaigns);
  }

  render() {
    return <div>Campaigns Index</div>;
  }
}
