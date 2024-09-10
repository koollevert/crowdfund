const HDWalletProvider = require("@truffle/hdwallet-provider");
const { Web3} = require("web3");

const compiledFactory = require("../ethereum/build/CampaignFactory.json");

const provider = new HDWalletProvider(
  "saddle connect tumble beyond impose siren spin brain crumble chief grief dice", // Your mnemonic
  "https://sepolia.infura.io/v3/b3be9208b48349fe9f9aa63ac4cf8b68" // Your Infura project URL
);
const web3= new Web3(provider);

const deploy = async () => {
  try {
    const accounts = await web3.eth.getAccounts();
    console.log("Attempting to deploy from account", accounts[0]);

    const result = await new web3.eth.Contract(compiledFactory.interface) // Changed to 'abi'
      .deploy({
        data: compiledFactory.bytecode,
      })
      .send({
        from: accounts[0],
        gas: "1000000",
      });

    console.log("Contract deployed to address:", result.options.address);
  } catch (error) {
    console.error("Deployment failed:", error.message || error);
  } finally {
    provider.engine.stop();
  }
};

// Execute the deploy function and handle errors properlly
deploy().catch((err) => {
  console.error("Unhandled promise rejection:", err);
  process.exit(1);
});
