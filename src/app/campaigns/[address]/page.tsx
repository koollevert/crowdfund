import { Card, CardBody, CardHeader } from '@nextui-org/react';
import Campaign from '../../../../ethereum/campaign';

interface CampaignShowPageProps {
  params: {
    address: string;
  };
}

export default async function CampaignShow({ params }: CampaignShowPageProps) {
  // Define the async function to fetch campaign data
  async function fetchData() {
    const campaign = Campaign(params.address);
    const summary = await campaign.methods.getSummary().call();
    console.log(summary)

    // Return fetched data
    return {
      minimumContribution: summary[0].toString(),
      balance: summary[1].toString(),
      requestsCount: summary[2].toString(),
      approversCount: summary[3].toString(),
      manager: summary[4],
    };
  }

  // Call the async function and fetch the data
  const data = await fetchData();

  // Function to render cards
  function renderCards() {
    const { balance, manager, minimumContribution, requestsCount, approversCount } = data;

    const items = [
      {
        title: manager,
        bodyText: 'The manager created this campaign and can create requests to withdraw money.',
      },
      {
        title: minimumContribution,
        bodyText: 'Minimum contribution required to become an approver.',
      },
      {
        title: balance,
        bodyText: 'The balance is the amount of money this campaign has left.',
      },
      {
        title: requestsCount,
        bodyText: 'Number of requests made by the manager to withdraw money.',
      },
      {
        title: approversCount,
        bodyText: 'Number of people who have donated to the campaign.',
      },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {items.map((item, index) => (
            <Card key={index} className="max-w-[400px] mb-4">
              <CardHeader className="flex gap-3">
                <div className="flex flex-col">
                  <p className="text-md font-bold">{item.title}</p>
                </div>
              </CardHeader>
              <CardBody>
                <p className="hover:underline">{item.bodyText}</p>
              </CardBody>
            </Card>
          ))}
        </div>
      );
  }

  // Return the JSX for rendering the cards
  return (
    <div>
      <h1>Campaign Details</h1>
      {renderCards()}
    </div>
  );
}
