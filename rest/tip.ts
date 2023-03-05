import type { SafeEventEmitterProvider } from "@web3auth/base";
import RPC from "../pages/api/ethersRPC";

interface TipParams {
  amountInEther: string;
  cid: string;
  web3Provider: SafeEventEmitterProvider;
}

const sendTip = async (params: TipParams) => {
  const rpc = new RPC(params.web3Provider);
  const result = await rpc.sendTipTransaction({
    amountInEther: params.amountInEther,
    cid: params.cid,
  });

  if (typeof result === "string") {
    // Handle error
    console.log(`Could not tip content: ${result}`);
    return;
  }

  if (result.status === 0) {
    // Handle error
    console.log("Transaction reverted");
    return;
  }
};

export default sendTip;
