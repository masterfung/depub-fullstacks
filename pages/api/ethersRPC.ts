/* eslint-disable @typescript-eslint/no-explicit-any */
import type { SafeEventEmitterProvider } from "@web3auth/base";
import { ethers } from "ethers";
import bs58 from "bs58";

interface TipTxParams {
  amountInEther: string;
  cid: string;
}

export default class EthereumRpc {
  private provider: SafeEventEmitterProvider;

  constructor(provider: SafeEventEmitterProvider) {
    this.provider = provider;
  }

  async getChainId(): Promise<any> {
    try {
      const ethersProvider = new ethers.providers.Web3Provider(this.provider);
      // Get the connected Chain's ID
      const networkDetails = await ethersProvider.getNetwork();
      return networkDetails.chainId;
    } catch (error) {
      return error;
    }
  }

  async getAccounts(): Promise<any> {
    try {
      const ethersProvider = new ethers.providers.Web3Provider(this.provider);
      const signer = ethersProvider.getSigner();

      // Get user's Ethereum public address
      const address = await signer.getAddress();

      return address;
    } catch (error) {
      return error;
    }
  }

  async getBalance(): Promise<string> {
    try {
      const ethersProvider = new ethers.providers.Web3Provider(this.provider);
      const signer = ethersProvider.getSigner();

      // Get user's Ethereum public address
      const address = await signer.getAddress();

      // Get user's balance in ether
      const balance = ethers.utils.formatEther(
        await ethersProvider.getBalance(address) // Balance is in wei
      );

      return balance;
    } catch (error) {
      return error as string;
    }
  }

  async sendTipTransaction(params: TipTxParams): Promise<any> {
    try {
      const ethersProvider = new ethers.providers.Web3Provider(this.provider);
      const signer = ethersProvider.getSigner();

      const destination =
        process.env.NEXT_PUBLIC_CONTRACT_CONTENT_STORE_MUMBAI ?? "";

      // Convert 1 ether to wei
      const amount = ethers.utils.parseEther(params.amountInEther);

      const abi = ["function tipContent(bytes32 cid) payable"];
      const abiInterface = new ethers.utils.Interface(abi);

      const cidBytes = bs58.decode(params.cid).slice(2);
      const calldata = abiInterface.encodeFunctionData("tipContent", [
        cidBytes,
      ]);

      // Submit transaction to the blockchain
      const tx = await signer.sendTransaction({
        to: destination,
        value: amount,
        maxFeePerGas: "6000000000", // Max fee per gas
        gasLimit: 8000000,
        data: calldata,
      });

      // Wait for transaction to be mined
      const receipt = await tx.wait();

      return receipt;
    } catch (error) {
      return error as string;
    }
  }

  async signMessage() {
    try {
      const ethersProvider = new ethers.providers.Web3Provider(this.provider);
      const signer = ethersProvider.getSigner();

      const originalMessage = "YOUR_MESSAGE";

      // Sign the message
      const signedMessage = await signer.signMessage(originalMessage);

      return signedMessage;
    } catch (error) {
      return error as string;
    }
  }

  async getPrivateKey(): Promise<any> {
    try {
      const privateKey = await this.provider.request({
        method: "eth_private_key",
      });

      return privateKey;
    } catch (error) {
      return error as string;
    }
  }
}
