import { z } from "zod";
import factory from "../ethereum/factory";
import web3 from "../ethereum/web3";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { error } from "console";

interface CampaignCreateFormStatus {
  errors: {
    minContribution?: string[];
    _form?: string[];
  };
  success?: boolean;
}

const campaignSchema = z.object({
  minContribution: z.number({
    invalid_type_error: "Minimum contribution must be a number",
    required_error: "Minimum contribution is required",
  }).min(1, "Minimum contribution must be greater than zero"), 
});

export async function fetchCampaigns() {
    try {
      const campaigns = await factory.methods.getDeployedCampaigns().call();
      return campaigns;
    } catch (err) {
      console.error('Error fetching campaigns:', err);
      return [];
    }
}

export type FormState={
  minContribution: string,
    errors: {
      minContribution: string | undefined,
    }
}; 

export async function createCampaign(previousState: FormState, formData: FormData) {
  const minContribution = formData.get('minContribution') as string;
  if (!minContribution || isNaN(Number(minContribution))) {
    return {
      ...previousState,  // Preserve the rest of the state
      minContribution,   // Keep the current input
      errors: {
        minContribution: "Contribution must be a valid number"
      }
    };
  }
  try {
    const accounts = await web3.eth.getAccounts();
    await factory.methods.createCampaign(parseInt(minContribution)).send({
      from: accounts[0],
    });
  } catch (err) {
    console.error('Error creating campaign:', err);
  }
  
  redirect('/')
  
  return {
    minContribution: "",
    errors: {
      minContribution: undefined,
    }
  }
  
}