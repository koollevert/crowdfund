
import React from "react";
import { Card, CardHeader, CardBody, Divider, Image } from "@nextui-org/react";

interface CardComponentProps {
  title: string;
  subtitle: string;
  imageSrc: string;
  bodyText: string;
}

const CardComponent: React.FC<CardComponentProps> = ({ title, subtitle, imageSrc, bodyText }) => {
  return (
    <Card className="max-w-[400px]">
      <CardHeader className="flex gap-3">
        <div className="flex flex-col">
          <p className="text-md">{title}</p>
          <p className="text-small text-default-500">{subtitle}</p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <p>{bodyText}</p>
      </CardBody>
    </Card>
  );
};

export default CardComponent;
