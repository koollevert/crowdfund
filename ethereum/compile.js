const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

// Remove the build directory if it exists
const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);

// Read the Solidity contract
const campaignPath = path.resolve(__dirname, 'contracts', 'campaign.sol');
const source = fs.readFileSync(campaignPath, 'utf8');

// Prepare input for solc
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

// Compile the contract
const output = JSON.parse(solc.compile(JSON.stringify(input))).contracts['campaign.sol'];

// Recreate the build directory
fs.ensureDirSync(buildPath);

// Write the output to a JSON file for each contract
for (let contract in output) {
    fs.outputJsonSync(
        path.resolve(buildPath, contract + '.json'),
        output[contract]
    );
}
