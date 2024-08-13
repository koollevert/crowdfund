// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
// pragma solidity ^0.7.4;

contract CampaignFactory {
    address[] public deployedCampaigns;
    function createCampaign(uint minimum) public{
        address newCampaign=address(new Campaign(minimum, msg.sender));
        deployedCampaigns.push(newCampaign);

        
    }

    function getDeployedCampaigns()public view returns (address[] memory){
            return deployedCampaigns;
    }
    
}

contract Campaign{
    
    struct  Request { // ** type definition of sorts
        string description;
        uint value;
        address recipient;
        bool complete;
        uint approvalCount;
        mapping(address=>bool) approvals;
    }

    Request[] public requests; //intantiated as an array of request
    
    address public manager;
    uint public minimumContribution;
    // address[] public approvers;
    mapping (address => bool) public approvers;
    uint public approversCount;

    modifier restricted() {
        require(msg.sender==manager);
        _;
    }

    constructor (uint minimum, address creator) {
        manager = creator;
        minimumContribution = minimum;
    }

    function contribute() public payable{
        require(msg.value>minimumContribution);

        // approvers.push(msg.sender);
        approvers[msg.sender]=true; //msg.sender does get stored instead the value true does
        approversCount++;
    }

    function  createRequest(string memory description, uint value, address recipient)public restricted{
        Request storage newRequest = requests.push();  //the first Request is type annotation the second is the actuall variable the the last is the value new instance 
        
            newRequest.description = description;
            newRequest.value = value;
            newRequest.recipient = recipient;
            newRequest.complete = false;
            newRequest.approvalCount = 0;
    }

    function approveRequest(uint index) public{
        Request storage request=requests[index]; //local variable looking at the same copy of request that allready exist in storage
        require(approvers[msg.sender]);
        require(!request.approvals[msg.sender]);

        request.approvals[msg.sender]=true;
        request.approvalCount++;

    }
    
    function finalizeRequest(uint index) public restricted{
        Request storage request=requests[index];
        require(request.approvalCount>(approversCount/22));
        require(!request.complete);
        payable(request.recipient).transfer(request.value);
        request.complete=true;
    }
   
}