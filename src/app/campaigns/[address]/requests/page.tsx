import Link from 'next/link';
import campaign from '../../../../../ethereum/campaign';
import web3 from '../../../../../ethereum/web3';
import { Button } from '@/components/ui/button';

interface Request {
    description: string;
    value: string;
    recipient: string;
    approvalCount: number;
    complete: boolean;
}

interface RequestListProps {
    params: { address: string };
}

export default async function RequestList({ params }: RequestListProps) {
    const campaignInstance = campaign(params.address);
    const requestsCount = await campaignInstance.methods.getRequestsCount().call();

    const requests: Request[] = await Promise.all(
        Array.from({ length: parseInt(requestsCount) }, (_, index) =>
            campaignInstance.methods.requests(index).call()
        )
    );

    return (
        <div>
            <Link href={`/campaigns/${params.address}/requests/new`}>
                <Button>Add New Request +</Button>
            </Link>
            <h1>Requests</h1>
            <ul>
                {requests.map((request, index) => (
                    <li key={index} className="border p-4 my-2 rounded">
                        <p><strong>Description:</strong> {request.description}</p>
                        <p><strong>Amount:</strong> {web3.utils.fromWei(request.value, 'ether')} ETH</p>
                        <p><strong>Recipient:</strong> {request.recipient}</p>
                        <p><strong>Approval Count:</strong> {request.approvalCount}</p>
                        <p><strong>Status:</strong> {request.complete ? "Complete" : "Pending"}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
