import web3 from '../../ethereum/web3';
import campaign from '../../ethereum/campaign';

export async function approveRequest(
    campaignAddress: string,
    requestIndex: number
): Promise<string | void> {
    try {
        // Get user's Ethereum accounts
        const accounts = await web3.eth.getAccounts();

        // Get the campaign instance
        const campaignInstance = campaign(campaignAddress);

        // Send the transaction to approve the request
        await campaignInstance.methods.approveRequest(requestIndex).send({
            from: accounts[0],
        });

        console.log('Request approved successfully!');
        return 'Success';
    } catch (err: unknown) {
        console.error('Error approving request:', err);
        if (err instanceof Error) {
            return `Error: ${err.message}`;
        }
        return 'An unknown error occurred';
    }
}
