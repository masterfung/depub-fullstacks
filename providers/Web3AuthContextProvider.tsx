/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { CHAIN_NAMESPACES, SafeEventEmitterProvider } from "@web3auth/base";
import { MetamaskAdapter } from "@web3auth/metamask-adapter";
import { Web3Auth } from "@web3auth/modal";
import { WalletConnectV1Adapter } from "@web3auth/wallet-connect-v1-adapter";
import {
  useEffect,
  useState,
  createContext,
  useCallback,
  ReactElement,
  useContext,
  useMemo,
} from "react";

import RPC from "../pages/api/ethersRPC";
import {
  RemoveProviderFromLocalStorage
} from "../helper/localstorage";
import WalletConnectivity from "../components/WalletConnectivity";
import { uiConsole } from "../helper/utility";
import { useRouter } from "next/router";

const clientId =
  "BPuR_hLLiDhWiVxJ8MCwNmSLafxA5eHWipd9_hFhUneYihA-yahdHsXX3Dgt5buK46flgXsfg5cz2OJX9-PYIxo"; // get from https://dashboard.web3auth.io

type Web3AuthContextType = {
  web3auth: Web3Auth | null;
  provider: SafeEventEmitterProvider | null;
  account: string | undefined;
  isOpen: boolean;
  login: () => Promise<void>;
  getUserInfo: () => Promise<void>;
  logout: () => Promise<void>;
  getChainId: () => Promise<void>;
  getAccounts: () => Promise<string | undefined>;
  getBalance: () => Promise<void>;
};

export const Web3AuthContext = createContext<Web3AuthContextType>({
  web3auth: null,
  provider: null,
  account: undefined,
  isOpen: false,
  login: async () => {},
  getUserInfo: async () => {},
  logout: async () => {},
  getChainId: async () => {},
  getAccounts: async () => undefined,
  getBalance: async () => {},
});

export const useWeb3AuthContext = () => useContext(Web3AuthContext);

export const Web3AuthContextProvider: React.FC<{ children?: ReactElement }> = ({
  children,
}) => {
  const [web3auth, setWeb3auth] = useState<Web3Auth | null>(null);
  const [provider, setProvider] = useState<SafeEventEmitterProvider | null>(
    null
  );
  const router = useRouter();
  const [account, setAccount] = useState<undefined | string>(undefined);
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  useEffect(() => {
    const init = async () => {
      try {
        const web3auth = new Web3Auth({
          clientId,
          web3AuthNetwork: "testnet", // mainnet, aqua, celeste, cyan or testnet
          chainConfig: {
            chainNamespace: CHAIN_NAMESPACES.EIP155,
            chainId: "0x13881",
            rpcTarget: "https://rpc-mumbai.maticvigil.com", // This is the public RPC we have added, please pass on your own endpoint while creating an app
          },
        });

        const walletConnectV1Adapter = new WalletConnectV1Adapter({
          adapterSettings: {
            bridge: "https://bridge.walletconnect.org",
          },
          clientId,
        });

        web3auth.configureAdapter(walletConnectV1Adapter);

        // adding metamask adapter

        const metamaskAdapter = new MetamaskAdapter({
          clientId,
          sessionTime: 3600, // 1 hour in seconds
          web3AuthNetwork: "cyan",
          chainConfig: {
            chainNamespace: CHAIN_NAMESPACES.EIP155,
            chainId: "0x1",
            rpcTarget: "https://rpc.ankr.com/eth", // This is the public RPC we have added, please pass on your own endpoint while creating an app
          },
        });
        // we can change the above settings using this function
        metamaskAdapter.setAdapterSettings({
          sessionTime: 86400, // 1 day in seconds
          chainConfig: {
            chainNamespace: CHAIN_NAMESPACES.EIP155,
            chainId: "0x13881",
            rpcTarget: "https://rpc-mumbai.maticvigil.com", // This is the public RPC we have added, please pass on your own endpoint while creating an app
          },
          web3AuthNetwork: "cyan",
        });

        // it will add/update  the metamask adapter in to web3auth class
        web3auth.configureAdapter(metamaskAdapter);

        // const torusWalletAdapter = new TorusWalletAdapter({
        //   clientId,
        // });

        // it will add/update  the torus-evm adapter in to web3auth class
        // web3auth.configureAdapter(torusWalletAdapter);

        setWeb3auth(web3auth);

        await web3auth.initModal();
        if (web3auth.provider) {
          setProvider(web3auth.provider);
        }
      } catch (error) {
        console.error(error);
      }
    };

    init()
      .then(() => {
        console.log(":+1");
      })
      .catch((error) => {
        console.error(error);
      });
  }, [router.pathname]);

  const login = async () => {
    if (!web3auth) {
      uiConsole("web3auth not initialized yet");
      return;
    }
    closeModal();
    const web3authProvider = await web3auth.connect();
    setProvider(web3authProvider);
    uiConsole("Logged in Successfully!");
  };

  const getUserInfo = async () => {
    if (!web3auth) {
      uiConsole("web3auth not initialized yet");
      return;
    }
    const user = await web3auth.getUserInfo();
    uiConsole(user);
  };

  const logout = async () => {
    if (!web3auth) {
      uiConsole("web3auth not initialized yet");
      return;
    }
    await web3auth.logout();
    RemoveProviderFromLocalStorage();
    setAccount(undefined);
    setProvider(null);
  };

  const getChainId = useCallback(async () => {
    if (!provider) {
      uiConsole("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const chainId = await rpc.getChainId();
    uiConsole(chainId);
  }, [provider]);

  const getAccounts = useCallback(async () => {
    if (!provider) {
      uiConsole("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const address: string = await rpc.getAccounts();
    uiConsole(address);
    return address;
  }, [provider]);

  const getBalance = useCallback(async () => {
    if (!provider) {
      uiConsole("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const balance = await rpc.getBalance();
    uiConsole(balance);
  }, [provider]);

  useEffect(() => {
    void (async () => {
      const addr = await getAccounts();
      setAccount(addr);
    })();
  }, [getAccounts]);

  const memoAccount = useMemo(() => account, [account]);

  return (
    <Web3AuthContext.Provider
      value={{
        web3auth,
        provider,
        account: memoAccount,
        isOpen,
        login,
        getUserInfo,
        logout,
        getChainId,
        getAccounts,
        getBalance,
      }}
    >
      {children}
    </Web3AuthContext.Provider>
  );
};
