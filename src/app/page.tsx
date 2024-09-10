'use client'
import Image from "next/image";
import factory from "../../ethereum/factory"; 
import { Component} from "react";

// export default function Home() {
//   return(
//     <div>home page</div>
//   ); 
// }

export default class CampaignIndex extends Component{
  async componentDidCatch(){
    const campaigns=await factory.methods.getDeployedCampigns().call();
    console.log(campaigns);
  }
  render(){
    return <div>Campaigns Index</div>
  }

}
