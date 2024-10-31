'use client';

import { useState } from 'react';
import web3 from '../../../../../../ethereum/web3';
import campaign from '../../../../../../ethereum/campaign';
import { Input } from '@nextui-org/react';
import { useForm } from 'react-hook-form';
import FormButton from '@/components/form-button';

interface RequestProps {
    params: { address: string };
}

export default function NewRequest({ params }: RequestProps) {
    const { register, handleSubmit, formState } = useForm();
    const { errors } = formState;

    const onSubmit = async ({data}: any) => {
        const campaignInstance = campaign(params.address);

        try {
            const accounts = await web3.eth.getAccounts();
            await campaignInstance.methods
                .createRequest(
                    data.description,
                    web3.utils.toWei(data.value, 'ether'),
                    data.recipient
                )
                .send({ from: accounts[0] });
            // Handle success
        } catch (err) {
            console.error(err);
            // Handle error
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <Input
                    {...register('description', { required: 'Description is required' })}
                    isInvalid={!!errors.description}
                    errorMessage={errors.description?.message as string || ''}
                    label="Description"
                    labelPlacement="outside"
                    placeholder="Description"
                />
            </div>

            <div>
                <Input
                    {...register('value', { required: 'Value in Ether is required' })}
                    isInvalid={!!errors.value}
                    errorMessage={errors.value?.message as string || ''}
                    label="Value in Ether"
                    labelPlacement="outside"
                    placeholder="Value"
                />
            </div>

            <div>
                <Input
                    {...register('recipient', { required: 'Recipient address is required' })}
                    isInvalid={!!errors.recipient}
                    errorMessage={errors.recipient?.message as string || ''}
                    label="Recipient Address"
                    labelPlacement="outside"
                    placeholder="Recipient Address"
                />
            </div>

            {errors._form ? (
                <div className="rounded p-2 bg-red-200 border border-red-400">
                    {(errors._form.message as string) || ''}
                </div>
            ) : null}

            <FormButton>Create Request</FormButton>
        </form>
    );
}
