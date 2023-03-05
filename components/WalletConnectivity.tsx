/* eslint-disable @typescript-eslint/no-unused-vars */
import { useContext, useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useRouter } from "next/router";
import { Web3AuthContext } from "../providers/Web3AuthContextProvider";

const WalletConnectivity = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const {
    provider,
    account,
    login,
    getUserInfo,
    logout,
    getChainId,
    getAccounts,
    getBalance,
  } = useContext(Web3AuthContext);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const create = () => {
    void router.push("/create");
  };

  const getMyWorks = () => {
    void router.push("/myWorks");
  }

  const loggedInView = (
    <>
      <div className="flex-container">
        <button onClick={getUserInfo} className="card">
          Get User Info
        </button>
        <button onClick={getChainId} className="card">
          Get Chain ID
        </button>
        <button onClick={getAccounts} className="card">
          Get Accounts
        </button>
        <button onClick={getBalance} className="card">
          Get Balance
        </button>
        <hr />
        <button onClick={getMyWorks} className="card">
          My Contents
        </button>
        <hr />
        <button onClick={logout} className="card bg-red-100 white">
          Log Out
        </button>
      </div>
      <div id="console" style={{ whiteSpace: "pre-line" }}>
        <p style={{ whiteSpace: "pre-line" }}></p>
      </div>
    </>
  );

  const unloggedInView = (
    <button onClick={login} className="card">
      Connect Wallet
    </button>
  );

  return (
    <>
      {account && (
        <button
          type="button"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-1 px-4 rounded mr-3"
          onClick={create}
        >
          Publish
        </button>
      )}
      <button
        type="button"
        onClick={openModal}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-1 px-4 rounded"
      >
        {account?.length
          ? `Wallet - ${account.substring(0, 7)}...${account.substring(
              account.length - 5
            )}`
          : "Login"}
      </button>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Login to FreePub
                  </Dialog.Title>
                  <div className="mt-2">
                    {provider ? loggedInView : unloggedInView}
                  </div>
                  {(router.pathname === "/create" || !account) && (
                    <>
                      <hr className="m-3" />
                      <div className="mt-2">
                        <>
                          <button onClick={create} className="card">
                            Submit Anonymously
                          </button>
                          <small>
                            Content submitted anonymously will post to IPFS and
                            will require community funding to be registered
                            on-chain.
                          </small>
                        </>
                      </div>
                    </>
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default WalletConnectivity;
