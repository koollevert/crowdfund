import { Card, CardHeader, CardBody, Divider, Image } from "@nextui-org/react";
import Link from "next/link";

interface CardComponentProps {
  title: string;
  bodyText: string;
  linkHref: string;
}

const CardComponent: React.FC<CardComponentProps> = ({ title, bodyText, linkHref }) => {
  return (
    <Card className="max-w-[400px]">
      <CardHeader className="flex gap-3">
        <div className="flex flex-col">
          <p className="text-md">{title}</p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <Link href= {linkHref}>
          <p className="hover:underline">{bodyText}</p>
        </Link>
      </CardBody>
    </Card>
  );
};

export default CardComponent;
