// app/campaigns/[address]/requests/[requestIndex]/page.tsx
import web3 from '../../../../../../ethereum/web3';
import campaign from '../../../../../../ethereum/campaign';
import { useState } from 'react';
import ApproveButton from '@/components/approvrButton';

interface RequestProps {
  params: {
    address: string;
    requestIndex: string;
  };
}

export default async function RequestPage({ params }: RequestProps) {
  const { address, requestIndex } = params;

  // Fetch request details from the smart contract
  const campaignInstance = campaign(address);
  const requestData = await campaignInstance.methods.getRequestDetails(requestIndex).call();
  const approversCount = await campaignInstance.methods.approversCount().call();

  // Format the data
  const request = {
    description: requestData.description,
    value: web3.utils.fromWei(requestData.value, 'ether'),
    recipient: requestData.recipient,
    complete: requestData.complete,
    approvalCount: requestData.approvalCount,
  };

  return (
    <div>
      <h1>Request {requestIndex}</h1>
      <p><strong>Description:</strong> {request.description}</p>
      <p><strong>Value:</strong> {request.value} ETH</p>
      <p><strong>Recipient:</strong> {request.recipient}</p>
      <p><strong>Approval Count:</strong> {request.approvalCount} / {approversCount}</p>
      <p><strong>Complete:</strong> {request.complete ? 'Yes' : 'No'}</p>

      {/* Add buttons for approval and finalization if needed */}
      <ApproveButton address={address} requestIndex={Number(requestIndex)} />
      {/* These buttons should trigger client-side interactions */}
    </div>
  );
}