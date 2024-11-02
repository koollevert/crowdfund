'use server';

import { z } from 'zod';
import web3 from '../../ethereum/web3';
import campaign from '../../ethereum/campaign';

const createRequestSchema = z.object({
    description: z.string().min(5, "Description must be at least 5 characters long"),
    value: z.string().refine(val => !isNaN(Number(val)), "Value must be a number"),
    recipient: z.string().min(42, "Recipient address must be 42 characters").max(42),
});

interface NewRequestFormState {
    errors: {
        description?: string[];
        value?: string[];
        recipient?: string[];
        _form?: string[];
    };
}

export async function createNewRequest(
    address: string,
    formState: NewRequestFormState,
    formData: FormData
): Promise<NewRequestFormState> {
    // Validate the form data
    const result = createRequestSchema.safeParse({
        description: formData.get("description"),
        value: formData.get("value"),
        recipient: formData.get("recipient"),
    });

    if (!result.success) {
        return {
            errors: result.error.flatten().fieldErrors,
        };
    }

    // Get campaign instance
    const campaignInstance = campaign(address);

    try {
        // Get user's Ethereum accounts
        const accounts = await web3.eth.getAccounts();

        // Send the transaction
        await campaignInstance.methods
            .createRequest(
                result.data.description,
                web3.utils.toWei(result.data.value, 'ether'),
                result.data.recipient
            )
            .send({ from: accounts[0] });

        // Redirect or revalidate as needed
        // e.g., revalidatePath or redirect here if necessary

        return { errors: {} }; // No errors if successful
    } catch (err: unknown) {
        // Handle transaction error
        return {
            errors: {
                _form: [err instanceof Error ? err.message : 'Transaction failed'],
            },
        };
    }
}
