'use client';

import React from 'react';
import web3 from '../../ethereum/web3';
import campaign from '../../ethereum/campaign';

interface ApproveButtonProps {
  address: string;
  requestIndex: number;
}

const ApproveButton: React.FC<ApproveButtonProps> = ({ address, requestIndex }) => {
  const handleApprove = async () => {
    try {
      const accounts = await web3.eth.getAccounts();
      const campaignInstance = campaign(address);

      await campaignInstance.methods.approveRequest(requestIndex).send({ from: accounts[0] });
      alert('Request approved successfully!');
    } catch (err: any) {
      alert('Error approving request: ' + err.message);
    }
  };

  return (
    <button onClick={handleApprove}>Approve Request</button>
  );
};

export default ApproveButton;
