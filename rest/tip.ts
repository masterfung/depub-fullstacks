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

  console.log(result);
};

export default sendTip;
