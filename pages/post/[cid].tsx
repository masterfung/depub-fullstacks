import { useState, useEffect, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Layout from "../../components/Layout";
import { useRouter } from "next/router";
import sendTip from "../../rest/tip";

import queryByCID from "../../rest/queryByCID";
import queryTip from "../../rest/queryTip";
import download from "../../rest/download";
import {
  Web3AuthContextProvider,
  useWeb3AuthContext,
} from "../../providers/Web3AuthContextProvider";
import { SafeEventEmitterProvider } from "@web3auth/base";

interface File {
  name: string;
  size?: number;
  versions?: any[];
  publishedDate?: any;
}
interface NetworkPost {
  title: string;
  description: string;
  author: string;
  files: File[];
}

interface ContentPost {
  id: string;
  title: string;
  description: string;
  author: string;
  files: File[];
  tags?: any[];
}

const displayBytes = (bytes: number) => {
  const truncated = (b: number) => Math.trunc(b * 100) / 100;
  if (bytes < 1e3) {
    return `${truncated(bytes)}B`;
  }
  if (bytes < 1e6) {
    return `${truncated(bytes / 1e3)}KB`;
  }
  if (bytes < 1e9) {
    return `${truncated(bytes / 1e6)}MB`;
  }
  return `${truncated(bytes / 1e9)}GB`;
};

const tipContent = (
  cid: string,
  tip: string,
  provider: SafeEventEmitterProvider
) => {
  sendTip({
    amountInEther: tip,
    cid,
    web3Provider: provider,
  })
    .then((res) => {
      console.log(res);
    })
    .catch((e) => {
      console.log(e);
    });
};

const Post = () => {
  const router = useRouter();
  const [post, setPost] = useState<ContentPost | undefined>();
  const [tipSelectIsOpen, setTipSelectIsOpen] = useState(false);
  const [tip, setTip] = useState<string | undefined>();
  const [receivedTips, setReceivedTips] = useState<string>("");
  const { account, provider } = useWeb3AuthContext();

  const closeModal = () => {
    setTipSelectIsOpen(false);
  };

  console.log("account from POST", account);

  useEffect(() => {
    const { cid } = (router.query as { cid: string }) || { cid: "1" };
    queryByCID(cid)
      .then((res) => {
        if (!res || !Array.isArray(res) || res.length === 0) {
          return;
        }
        const postData = res[0] as NetworkPost;
        console.log(postData);
        const dirFile = {
          name: "",
        };
        setPost({
          id: cid,
          title: postData.title,
          description: postData.description,
          author: postData.author ?? "Anonymous",
          files: [dirFile].concat(
            postData.files.map((file) => {
              return {
                name: file.name,
                size: file.size,
              };
            })
          ),
        });
      })
      .catch((e) => {
        console.log(e);
      });
    if (provider) {
      console.log("Querying for Tip");
      console.log(cid);
      queryTip({
        cid,
        web3Provider: provider,
      })
        .then((res) => setReceivedTips(res))
        .catch((e) => {
          console.log(e);
        });
    }
  }, [router.query, router.pathname, provider]);

  // we will need to query the endpoint to get the data back from the cid/pid and display the data here

  return (
    <div
      className={`p-8 m-4 border-2 ${
        account === "Anonymous" ? "border-red-200" : "border-gray-200"
      } rounded-lg`}
    >
      <h2 className="text-2xl font-bold mb-2">{post?.title}</h2>
      <div className="mb-4">
        {post?.tags && <span className="font-bold">Tags: </span>}
        {post?.tags?.map((tag, index) => (
          <span
            key={index}
            className="bg-gray-200 px-2 py-1 rounded-full text-sm font-semibold text-gray-700 mr-2"
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="mb-4 flex">
        <div className="w-1/2">
          <span className="font-bold">Author: </span>
          <span className="text-gray-600">{post?.author}</span>
        </div>
        <div className="w-1/2 text-right">
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "right",
            }}
          >
            <span
              className={` ${
                post?.author === "Anonymous" ? "bg-gray-400" : "bg-green-800"
              } text-white rounded-lg px-2 py-2 text-sm font-medium mr-2`}
            >
              {post?.author === "Anonymous" ? "Needs a Tip" : "Funded"}
            </span>
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full"
              onClick={() => {
                setTipSelectIsOpen(true);
              }}
            >
              Tip
            </button>
          </div>
          {receivedTips !== "" && (
            <div className="mt-3">{`Tips: ${receivedTips} MATIC`}</div>
          )}
        </div>
      </div>
      <p className="text-gray-600 mb-4">{post?.description}</p>
      <div className="mb-4">
        {post?.files && <span className="font-bold">Files:</span>}
        <ul className="list-disc list-inside">
          {post?.files?.map((file, index) => (
            <li key={index}>
              <button
                style={{
                  textDecoration: "underline",
                }}
                onClick={async () => {
                  await download(post.id, file.name);
                }}
              >
                {file.name === "" ? `${post.id} (Directory)` : file.name}
              </button>
              {file.size && <>{` (${displayBytes(file.size)})`}</>}
              {file.versions && (
                <div className="ml-4">
                  <span className="font-bold">Versions:</span>{" "}
                  {file.versions?.join(", ")}
                </div>
              )}
              {file.publishedDate && (
                <div className="ml-4">
                  <span className="font-bold">Published Date:</span>{" "}
                  {file.publishedDate}
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
      <Transition appear show={tipSelectIsOpen} as={Fragment}>
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
                    Select Tip Amount
                  </Dialog.Title>

                  <input
                    type="text"
                    className="form-input w-full border-gray-400 border h-10 px-3 py-2 text-gray-700 placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300"
                    onChange={(e) => {
                      setTip(e.target.value);
                    }}
                  />

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => {
                        if (!tip || !provider) {
                          return;
                        }
                        const { cid } = (router.query as { cid: string }) || {
                          cid: "1",
                        };
                        tipContent(cid, tip, provider);
                        closeModal();
                      }}
                    >
                      Send
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

const PostPage = () => (
  <Web3AuthContextProvider>
    <Layout>
      <Post />
    </Layout>
  </Web3AuthContextProvider>
);

export default PostPage;
