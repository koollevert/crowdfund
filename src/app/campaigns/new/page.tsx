'use client';
import { Button, Input } from "@nextui-org/react";
import FormButton from "../../../../common/form-button";
import { createCampaign } from "../../../../actions";

export default function CampaignNew() {
  return (
    <div className="space-y-2 px-1">
      <form action={createCampaign}>
        <label>Minimum Contribution</label>
        <Input
          name="minContribution"
          label="wei"
          labelPlacement="outside-left"
          placeholder="Enter amount"
        />
        <FormButton>Create</FormButton>
      </form>
    </div>
  );
}

