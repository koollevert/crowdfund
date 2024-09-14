import { Button, Input } from "@nextui-org/react";

export default function CampaignNew(){
    return(
        <div className="space-y-2 px-1">
            <form>
                <Input
                    name="content"
                    label="Minimum Contribution"
                    labelPlacement="inside"
                    placeholder="Create Project"
                />
                <Button color="primary" >Create</Button>
            </form>
        </div>
    )
}