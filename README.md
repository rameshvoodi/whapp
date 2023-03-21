# NFT Whitelist dApp

The NFT Whitelist dApp is a decentralized application built on the Ethereum blockchain that allows user to restrict access to limited number of addresses.

## click here to view deployed dApp
[deployed app](https://whapp.vercel.app/)
## Project Structure

The project contains two folders:

- `client`: A Next.js app that displays smart contract data. The client dependencies are: ethers, web3Modal,dotenv and Tailwind CSS.

- `server`: Contains Solidity code which is compiled using Hardhat. The server dependencies are: @nomicfoundation/hardhat-toolbox, Hardhat, and dotenv.

## Features

The NFT Whitelist dApp offers the following features:

- Whitelist creation: Users can add their address to whitelist by connecting their wallet

## Getting Started

To use the NFT Whitelist dApp, you will need to have an Ethereum wallet, such as MetaMask, installed on your browser. You will also need to have some goerli Ether (ETH) to pay for gas fees.

To get started, follow these steps:

1. Clone the repository and navigate to the project directory.

2. Install the client and server dependencies by running `npm install` in the `client` and `server` directories.

3. Start the server by running `npx hardhat node` in the `server` directory.

4. create a folder in `client`. add the `address of deployed smart contract` and `private key`.

5. Deploy the contract to the local network by running `npx hardhat run scripts/deploy.js --network localhost` in the `server` directory.

6. Start the client by running `npm run dev` in the `client` directory.

7. Connect your Ethereum wallet to the dApp.


