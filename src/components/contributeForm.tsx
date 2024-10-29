// // /components/ContributeForm.tsx
// "use client";
// import { useState } from "react";
// import { Button } from "@/components/ui/button"; // Ensure this path is correct
// import { Input } from "@/components/ui/input"; // Ensure this path is correct
// import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"; // Ensure this path is correct
// import { useForm } from "react-hook-form";
// const form= useForm();

// export default function ContributeForm() {

//     return (
//         <Form{...form}>
//             <form>
//                 <div className="sapce-y-4">
//                     <FormField
//                         control={form.control}
//                         name="contribution"
//                         render={({field})=>(
//                             <FormItem>
//                                 <FormLabel>ether</FormLabel>
//                                 <FormControl>
//                                     <Input {...field} placeholder="Amount to Contribute"/>
//                                 </FormControl>
//                             </FormItem>
//                         )}
//                     >
//                     </FormField>
//                 </div>
//                 <Button type="submit" >Contribute!</Button>

//             </form>
           
            
//         </Form>
//     );
// }


// /components/ContributeForm.tsx
// /components/ContributeForm.tsx
// /components/ContributeForm.tsx
// /components/ContributeForm.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button"; // Ensure this path is correct
import { Input } from "@/components/ui/input"; // Ensure this path is correct
import campaign from "../../ethereum/campaign";
import web3 from "../../ethereum/web3";

interface ContributeFormProps {
    address: string;
}

export default function ContributeForm({ address }: ContributeFormProps) {
    const [contribution, setContribution] = useState("");

    const onSubmit = async (event: React.FormEvent) => {
        event.preventDefault(); // Prevent page reload

        const campaignInstance = campaign(address);

        try {
            const accounts = await web3.eth.getAccounts();
            await campaignInstance.methods.contribute().send({
                from: accounts[0], // Specify the account to use
                value: web3.utils.toWei(contribution, 'ether'),
            });
            console.log("Contribution successful!");
        } catch (err) {
            console.error("Error contributing:", err);
        }
    };

    return (
        <form onSubmit={onSubmit}>
            <div className="space-y-4">
                <div>
                    <label htmlFor="contribution" className="block text-sm font-medium text-gray-700">
                        Contribution Amount (ether)
                    </label>
                    <Input
                        id="contribution"
                        placeholder="Amount to Contribute"
                        value={contribution}
                        onChange={(e) => setContribution(e.target.value)} // Capture input value
                    />
                </div>
            </div>
            <Button type="submit">Contribute!</Button>
        </form>
    );
}

