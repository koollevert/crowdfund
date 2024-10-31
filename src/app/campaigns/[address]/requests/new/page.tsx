'use client';

import { useState } from 'react';
import web3 from '../../../../../../ethereum/web3';
import campaign from '../../../../../../ethereum/campaign';

export default function NewRequest({ params }) {
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');
    const [recipient, setRecipient] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const campaignInstance = campaign(params.address);

        try {
            const accounts = await web3.eth.getAccounts();
            await campaignInstance.methods.createRequest(
                description,
                web3.utils.toWei(value, 'ether'),
                recipient
            ).send({ from: accounts[0] });
            // Handle success
        } catch (err) {
            console.error(err);
            // Handle error
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Description</label>
                <input
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <div>
                <label>Value in Ether</label>
                <input
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
            </div>
            <div>
                <label>Recipient Address</label>
                <input
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                />
            </div>
            <button type="submit">Create Request</button>
        </form>
    );
}
