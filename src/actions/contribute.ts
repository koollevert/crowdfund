// 'use server';

import { z } from 'zod';
import web3 from '../../ethereum/web3';
import campaign from '../../ethereum/campaign';

const contributeSchema = z.object({
    contribution: z.string().refine(val => !isNaN(Number(val)) && Number(val) > 0, "Contribution must be a positive number"),
});

interface ContributeFormState {
    errors: {
        contribution?: string[];
        _form?: string[];
    };
}

export async function contribute(
    address: string,
    formState: ContributeFormState,
    formData: FormData
): Promise<ContributeFormState> {
    const result = contributeSchema.safeParse({
        contribution: formData.get("contribution"),
    });

    if (!result.success) {
        return {
            errors: result.error.flatten().fieldErrors,
        };
    }

    const campaignInstance = campaign(address);

    try {
        const accounts = await web3.eth.getAccounts();

        await campaignInstance.methods
            .contribute()
            .send({
                from: accounts[0],
                value: web3.utils.toWei(result.data.contribution, 'ether'),
            });

        return { errors: {} };
    } catch (err: unknown) {
        return {
            errors: {
                _form: [err instanceof Error ? err.message : 'Transaction failed'],
            },
        };
    }
}
