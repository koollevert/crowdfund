"use server"

import factory from "../ethereum/factory";

// app/fetchCampaigns.ts (or in the same file if preferred)
export async function fetchCampaigns() {
    try {
      const campaigns = await factory.methods.getDeployedCampaigns().call();
      return campaigns;
    } catch (err) {
      console.error('Error fetching campaigns:', err);
      return [];
    }
}
  