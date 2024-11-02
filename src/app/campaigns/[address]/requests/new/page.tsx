'use client';

import { useFormState } from 'react-dom'; // Assuming you want to keep using this for form handling
import { Input } from '@nextui-org/react';
import * as actions from '@/actions/newRequest'; // Adjust the path as necessary
import FormButton from '@/components/form-button';

interface RequestProps {
    params: { address: string };
}

export default function NewRequest({ params }: RequestProps) {
    // Bind the action directly using the address as part of the arguments
    const [formState, action] = useFormState(
        actions.createNewRequest.bind(null, params.address),
        { errors: {} }
    );

    return (
        <form action={action}>
            <div className="flex flex-col gap-4 p-4 w-80">
                <h3 className="text-lg">Create a Request</h3>

                <Input
                    isInvalid={!!formState.errors.description}
                    errorMessage={formState.errors.description?.join(', ')}
                    name="description"
                    label="Description"
                    labelPlacement="outside"
                    placeholder="Description"
                />
                <Input
                    isInvalid={!!formState.errors.value}
                    errorMessage={formState.errors.value?.join(', ')}
                    name="value"
                    label="Value in Ether"
                    labelPlacement="outside"
                    placeholder="Value"
                />
                <Input
                    isInvalid={!!formState.errors.recipient}
                    errorMessage={formState.errors.recipient?.join(', ')}
                    name="recipient"
                    label="Recipient Address"
                    labelPlacement="outside"
                    placeholder="Recipient Address"
                />

                {formState.errors._form ? (
                    <div className="rounded p-2 bg-red-200 border border-red-400">
                        {formState.errors._form.join(', ')}
                    </div>
                ) : null}

                <FormButton>Create Request</FormButton>
            </div>
        </form>
    );
}
