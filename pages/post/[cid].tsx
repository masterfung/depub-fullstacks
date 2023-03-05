import { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import { useRouter } from "next/router";

import queryByCID from "../../rest/queryByCID";
import download from "../../rest/download";
import {
  Web3AuthContextProvider,
  useWeb3AuthContext,
} from "../../providers/Web3AuthContextProvider";

interface File {
  name: string;
  size?: string;
  format?: string;
  versions?: any[];
  publishedDate?: any;
}
interface NetworkPost {
  title: string;
  description: string;
  author: string;
  fileNames: string[];
}

interface ContentPost {
  id: string;
  title: string;
  description: string;
  author: string;
  files: File[];
  tags?: any[];
}

const Post = () => {
  const router = useRouter();
  const [post, setPost] = useState<ContentPost | undefined>();
  const { account } = useWeb3AuthContext();

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
        setPost({
          id: cid,
          title: postData.title,
          description: postData.description,
          author: postData.author ?? "Anonymous",
          files: postData.fileNames.map((fileName) => {
            return {
              name: fileName,
            };
          }),
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }, [router.query, router.pathname]);

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
          <span
            className={` ${
              post?.author === "Anonymous" ? "bg-gray-400" : "bg-green-800"
            } text-white rounded-lg px-2 py-2 text-sm font-medium`}
          >
            {post?.author === "Anonymous" ? "Needs a Tip" : "Funded"}
          </span>
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
              {file.size && (
                <>
                  ({file.size}, {file.format})
                </>
              )}
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
