const HDWalletProvider = require('@truffle/hdwallet-provider');
const {Web3} = require('web3');
const fs = require('fs');
const path = require('path');
const solc = require('solc'); // Ensure solc is installed for Solidity compilation
const {HttpsProxyAgent} = require('https-proxy-agent');
const {HttpProxyAgent} = require('http-proxy-agent');

// Load environment variables from .env file
require('dotenv').config();

// Define proxy if needed
const proxy = process.env.HTTPS_PROXY || process.env.HTTP_PROXY;
const proxyAgent = proxy ? (proxy.startsWith('http://') ? new HttpProxyAgent(proxy) : new HttpsProxyAgent(proxy)) : null;

// Initialize Web3 provider
const { MNEMONIC, INFURA_PROJECT_URL } = process.env;
if (!MNEMONIC || !INFURA_PROJECT_URL) {
    console.error('Environment variables MNEMONIC and INFURA_PROJECT_URL must be set.');
    process.exit(1);
}

// Use proxy agent with HDWalletProvider
const provider = new HDWalletProvider({
    mnemonic: MNEMONIC,
    providerOrUrl: INFURA_PROJECT_URL,
    pollingInterval: 15000, // Adjust if needed
    // Note: HDWalletProvider does not support proxy directly
    // This is for illustrative purposes; proxy handling might need network configuration or other methods
    // For HTTP requests use axios or fetch with proxy configuration if required
});

const web3 = new Web3(provider);

// Function to compile contract
const compileContract = (source) => {
    const input = {
        language: 'Solidity',
        sources: {
            'campaign.sol': {
                content: source,
            },
        },
        settings: {
            outputSelection: {
                '*': {
                    '*': ['*'],
                },
            },
        },
    };
    const output = JSON.parse(solc.compile(JSON.stringify(input)));
    if (output.errors) {
        output.errors.forEach((err) => console.error(err));
        process.exit(1);
    }
    return output.contracts['campaign.sol'].Campaign;
};

// Main deploy function
const deploy = async () => {
    try {
        // Read and compile contract
        const contractPath = path.resolve(__dirname, 'contracts', 'campaign.sol');
        if (!fs.existsSync(contractPath)) {
            throw new Error(`Contract file not found at path: ${contractPath}`);
        }

        const source = fs.readFileSync(contractPath, 'utf8');
        const { abi, evm } = compileContract(source);

        // Get accounts and deploy contract
        const accounts = await web3.eth.getAccounts();
        console.log('Deploying from account:', accounts[0]);

        const result = await new web3.eth.Contract(abi)
            .deploy({ data: '0x' + evm.bytecode.object })
            .send({ from: accounts[0], gas: '1000000' });

        console.log('Contract deployed to:', result.options.address);
    } catch (error) {
        console.error('Deployment failed:', error.message || error);
    } finally {
        provider.engine.stop();
    }
};

// Execute deploy function and handle promise rejections
deploy().catch((err) => {
    console.error('Unhandled promise rejection:', err);
    process.exit(1);
});
