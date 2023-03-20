  import Head from "next/head";
  import Image from "next/image";
  import styles from "../styles/Home.module.css";
  import Web3Modal from "web3modal";
  import { providers, Contract } from "ethers";
  import { useEffect, useRef, useState } from "react";
  import { WHITELIST_CONTRACT_ADDRESS, abi } from "../constants";
  
  export default function Home() {
    
    const [walletConnected, setWalletConnected] = useState(false);
    
    const [joinedWhitelist, setJoinedWhitelist] = useState(false);
   
    const [loading, setLoading] = useState(false);
    
    const [numberOfWhitelisted, setNumberOfWhitelisted] = useState(0);
    const web3ModalRef = useRef();
  
    /**
     
     * @param {*} needSigner 
     */
    const getProviderOrSigner = async (needSigner = false) => {
      
      const provider = await web3ModalRef.current.connect();
      const web3Provider = new providers.Web3Provider(provider);
  
      const { chainId } = await web3Provider.getNetwork();
      if (chainId !== 5) {
        window.alert("Change the network to Goerli");
        throw new Error("Change network to Goerli");
      }
  
      if (needSigner) {
        const signer = web3Provider.getSigner();
        return signer;
      }
      return web3Provider;
    };
  

    const addAddressToWhitelist = async () => {
      try {
        const signer = await getProviderOrSigner(true);
      
        const whitelistContract = new Contract(
          WHITELIST_CONTRACT_ADDRESS,
          abi,
          signer
        );
      
        const tx = await whitelistContract.addToWhiteList();
        setLoading(true);
        await tx.wait();
        setLoading(false);
        await getNumberOfWhitelisted();
        setJoinedWhitelist(true);
      } catch (err) {
        console.error(err);
      }
    };
  
    const getNumberOfWhitelisted = async () => {
      try {
        const provider = await getProviderOrSigner();
        
        const whitelistContract = new Contract(
          WHITELIST_CONTRACT_ADDRESS,
          abi,
          provider
        );
        const _numberOfWhitelisted =
          await whitelistContract.noOfWhiteListedAccounts();
        setNumberOfWhitelisted(_numberOfWhitelisted);
      } catch (err) {
        console.error(err);
      }
    };
    const checkIfAddressInWhitelist = async () => {
      try {
        const signer = await getProviderOrSigner(true);
        const whitelistContract = new Contract(
          WHITELIST_CONTRACT_ADDRESS,
          abi,
          signer
        );
        const address = await signer.getAddress();
      
        const _joinedWhitelist = await whitelistContract.whiteListedAccounts(
          address
        );
        setJoinedWhitelist(_joinedWhitelist);
      } catch (err) {
        console.error(err);
      }
    };
  
  
    const connectWallet = async () => {
      try {
     
        await getProviderOrSigner();
        setWalletConnected(true);
  
        checkIfAddressInWhitelist();
        getNumberOfWhitelisted();
      } catch (err) {
        console.error(err);
      }
    };
  
    
    const renderButton = () => {
      if (walletConnected) {
        if (joinedWhitelist) {
          return (
            <div>
              Thanks for joining the Whitelist!
            </div>
          );
        } else if (loading) {
          return <button className="px-8 py-3 text-xl font-semibold text-center text-white transition duration-300 rounded-lg hover:from-purple-600 hover:to-pink-600 ease bg-gradient-to-br from-purple-500 to-pink-500 " >Loading...</button>;
        } else {
          return (
            <button className="px-8 py-3 text-xl font-semibold text-center text-white transition duration-300 rounded-lg hover:from-purple-600 hover:to-pink-600 ease bg-gradient-to-br from-purple-500 to-pink-500" onClick={addAddressToWhitelist}>
              Join the Whitelist
            </button>
          );
        }
      } else {
        return (
          <button className='px-8 py-3 text-xl font-semibold text-center text-white transition duration-300 rounded-lg hover:from-purple-600 hover:to-pink-600 ease bg-gradient-to-br from-purple-500 to-pink-500' onClick={connectWallet}>
            Connect your wallet
          </button>
        );
      }
    };
  
  
    useEffect(() => {
     
      if (!walletConnected) {
     
        web3ModalRef.current = new Web3Modal({
          network: "goerli",
          providerOptions: {},
          disableInjectedProvider: false,
        });
        connectWallet();
      }
    }, [walletConnected]);
  return (
    
    <div className='h-screen bg-gradient-to-b from-black to-pink-400'>
    <Head>
     <title>whapp</title>
    </Head>
      <div className="container mx-auto flex flex-col justify-center items-center px-4 py-16 h-full">
         <h1 className= "mt-14 text-2xl md:text-4xl font-mono text-white">welcome to nft collections</h1>
         <div className=" grid md:grid-cols-2 py-10 gap-10">
         <div className="info text-white">
         <div>
           <h1 className="py-14 text-sm md:text-lg font-medium text-gray-300">an NFT collection for developers in Crypto</h1>
           <h1 className="py-4 text-sm md:text-lg font-medium text-gray-300">{numberOfWhitelisted} people have already joined</h1>
          </div>
          <div className="py-9">
          
          {renderButton()}
          </div>
         </div>
         <div className="image hidden md:block">
         <Image className=" opacity-70" src='/coins.jpg' alt="coins" width={300} height={300} />
          </div>
         </div>
         <h1 className=" text-sm  text-white font-bold font-mono">by rameshvoodi</h1>
      </div>
    </div>
  )
}
