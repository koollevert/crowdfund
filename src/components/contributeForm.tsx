'use client';

import { useFormState } from 'react-dom';
import { Input, Spacer } from '@nextui-org/react';
import * as actions from '@/actions/contribute'; // Adjust path as needed
import FormButton from './form-button';
// import FormButton from '@/components/FormButton'; // Import the FormButton component

interface ContributeFormProps {
    address: string;
}

export default function ContributeForm({ address }: ContributeFormProps) {
    const [formState, action] = useFormState(
        actions.contribute.bind(null, address),
        { errors: {} }
    );

    return (
        <form action={action}>
            <div className="space-y-4">
                <h3 className="text-lg">Contribute to the Campaign</h3>

                <Input
                    isInvalid={!!formState.errors.contribution}
                    errorMessage={formState.errors.contribution?.join(', ')}
                    name="contribution"
                    placeholder="Amount to Contribute"
                    fullWidth
                    label="Contribution Amount (ether)"
                />

                <Spacer y={0.5} /> {/* Adds spacing between components */}

                {formState.errors._form && (
                    <p className="text-red-500 text-sm">
                        {formState.errors._form.join(', ')}
                    </p>
                )}

                {/* Use FormButton here instead of Button */}
                <FormButton>Contribute!</FormButton>
            </div>
        </form>
    );
}
