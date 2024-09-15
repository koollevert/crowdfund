'use client';
import { Button, Input } from "@nextui-org/react";
import FormButton from "../../../../common/form-button";
import { createCampaign, FormState } from "../../../../actions";
import { useFormState } from "react-dom";

export default function CampaignNew() {
  const[formState, wrappedCreateCampaign]=useFormState(createCampaign, {
    minContribution: '',
    errors: {
      minContribution: undefined,
    }
  } as FormState);
  return (
    <div className="space-y-2 px-1">
      <form action={wrappedCreateCampaign}>
        <label>Minimum Contribution</label>
        <Input
          defaultValue={formState.minContribution}
          name="minContribution"
          label="wei"
          labelPlacement="outside-left"
          placeholder="Enter amount"
        />
        {formState.errors.minContribution &&(
          <div className="text-red-400">{formState.errors.minContribution}</div>
        )}
        <FormButton>Create</FormButton>
      </form>
    </div>
  );
}

