import type { SafeEventEmitterProvider } from "@web3auth/base";
import RPC from "../pages/api/ethersRPC";

interface QueryTipParams {
  cid: string;
  web3Provider: SafeEventEmitterProvider;
}

const queryTip = async (params: QueryTipParams) => {
  const { cid, web3Provider } = params;
  const rpc = new RPC(web3Provider);
  return await rpc.getContentTips(cid);
};

export default queryTip;
