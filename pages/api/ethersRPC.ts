/* eslint-disable @typescript-eslint/no-explicit-any */
import type { SafeEventEmitterProvider } from "@web3auth/base";
import { ethers } from "ethers";
import bs58 from "bs58";
import {
  AxelarGMPRecoveryAPI,
  Environment,
  AddGasOptions,
  EvmChain,
} from "@axelar-network/axelarjs-sdk";

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

  async sendTipTransaction(params: TipTxParams) {
    try {
      const ethersProvider = new ethers.providers.Web3Provider(this.provider);
      const signer = ethersProvider.getSigner();

      const destination =
        process.env.NEXT_PUBLIC_CONTRACT_CONTENT_STORE_MUMBAI ?? "";

      // Convert 1 ether to wei
      const amount = ethers.utils.parseEther(params.amountInEther);

      const abi = ["function tipContent(bytes32 cid) payable"];
      const abiInterface = new ethers.utils.Interface(abi);

      const cidBytes = this.cidStringToBytes(params.cid);
      const calldata = abiInterface.encodeFunctionData("tipContent", [
        cidBytes,
      ]);

      // Submit transaction to the blockchain
      const tx = await signer.sendTransaction({
        to: destination,
        value: amount,
        maxFeePerGas: "18000000000", // Max fee per gas
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

  async sendAxelarBackupContract(cid: string) {
    try {
      const ethersProvider = new ethers.providers.Web3Provider(this.provider);
      const signer = ethersProvider.getSigner();

      const gateway =
        process.env.NEXT_PUBLIC_CONTRACT_AXELAR_GATEWAY_MUMBAI ?? "";
      const destination =
        process.env.NEXT_PUBLIC_CONTRACT_BACKUP_STORE_ARBITRUM_GOERLI ?? "";

      const abi = [
        "function callContract(string calldata destinationChain,string calldata contractAddress, bytes calldata payload) external",
      ];
      const abiInterface = new ethers.utils.Interface(abi);

      const cidBytes = this.cidStringToBytes(cid);
      const calldata = abiInterface.encodeFunctionData("callContract", [
        EvmChain.ARBITRUM,
        destination,
        cidBytes,
      ]);

      // Submit transaction to the blockchain
      const tx = await signer.sendTransaction({
        to: gateway,
        maxFeePerGas: "18000000000", // Max fee per gas
        gasLimit: 8000000,
        data: calldata,
      });

      // Wait for transaction to be mined
      const receipt = await tx.wait();
      console.log("Sent to Arbitrum via Axelar:");
      console.log(receipt);
      return receipt;
    } catch (error) {
      return error as string;
    }
  }

  async sendAxelarBackupGas(txHash: string) {
    try {
      const ethersProvider = new ethers.providers.Web3Provider(this.provider);
      const api = new AxelarGMPRecoveryAPI({
        environment: Environment.TESTNET,
      });
      const options: AddGasOptions = {
        evmWalletDetails: { provider: ethersProvider },
      };

      const { success, transaction, error } = await api.addNativeGas(
        EvmChain.POLYGON,
        txHash,
        options
      );

      console.log("Axelar: Added to gas service");
      console.log(success);
      console.log(error);

      return transaction;
    } catch (error) {
      return error as string;
    }
  }

  private cidStringToBytes(cid: string) {
    return bs58.decode(cid).slice(2);
  }

  async getContentTips(cid: string) {
    try {
      const ethersProvider = new ethers.providers.Web3Provider(this.provider);
      const destination =
        process.env.NEXT_PUBLIC_CONTRACT_CONTENT_STORE_MUMBAI ?? "";

      const abi = [
        {
          inputs: [
            {
              internalType: "bytes32",
              name: "cid",
              type: "bytes32",
            },
          ],
          name: "metadata",
          outputs: [
            {
              name: "author",
              type: "address",
            },
            {
              name: "tips",
              type: "uint256",
            },
            // ...
          ],
          stateMutability: "view",
          type: "function",
        },
      ];

      const cidBytes = bs58.decode(cid).slice(2);

      const contract = new ethers.Contract(destination, abi, ethersProvider);
      // eslint-disable-next-line
      const result = await contract.metadata(cidBytes);
      console.log("Total Tips:");
      // eslint-disable-next-line
      console.log(ethers.utils.formatEther(result.tips));
      // eslint-disable-next-line
      return ethers.utils.formatEther(result.tips);
    } catch (e) {
      console.log(e);
      return "";
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
