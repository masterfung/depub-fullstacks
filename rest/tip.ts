import type { SafeEventEmitterProvider } from "@web3auth/base";
import RPC from "../pages/api/ethersRPC";

interface TipParams {
  amountInEther: string;
  cid: string;
  web3Provider: SafeEventEmitterProvider;
}

const sendTip = async (params: TipParams) => {
  const { amountInEther, cid, web3Provider } = params;
  const rpc = new RPC(web3Provider);
  const result = await rpc.sendTipTransaction({
    amountInEther,
    cid,
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

  // eslint-disable-next-line
  updateIndex(cid);
  // eslint-disable-next-line
  backupViaAxelar(cid, web3Provider);
};

const updateIndex = async (cid: string) => {
  const url = `../api/updateIndexStatus?directoryCID=${cid}&status=FUNDED`;
  console.log(`URL`);
  console.log(url);

  const result = await fetch(url, {
    method: "GET",
  });

  if (result.status !== 200) {
    return;
  }

  return true;
};

const backupViaAxelar = async (
  cid: string,
  provider: SafeEventEmitterProvider
) => {
  const rpc = new RPC(provider);
  const result = await rpc.sendAxelarBackup(cid);
  console.log(result);
};

export default sendTip;
