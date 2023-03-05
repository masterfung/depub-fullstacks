import { useContext, useEffect, useState } from "react";
import {
  Web3AuthContext,
  Web3AuthContextProvider,
} from "../../providers/Web3AuthContextProvider";
import Layout from "../../components/Layout";
import { useRouter } from "next/router";
import { CardsType } from "../../types/app";
import queryPersonalContents from "../../rest/queryPersonalContents";
import SearchBar from "../../components/SearchBar";
import Cards from "../../components/Cards";
import Loading from "../../components/Loading";

const MyWorks = () => {
  const { account: address } = useContext(Web3AuthContext);
  console.log("MyWorks - account", address);

  const [cards, setCards] = useState<CardsType>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsLoading(true);
    address &&
      queryPersonalContents(searchTerm, address)
        .then((res: object[]) => {
          setCards(
            res.map((post: any) => ({
              // eslint-disable-next-line
              id: post._id,
              // eslint-disable-next-line
              title: post.title,
              // eslint-disable-next-line
              description: post.description,
              // eslint-disable-next-line
              author: post.author,
              version: "1",
            }))
          );
          setIsLoading(false);
        })
        .catch((e) => {
          setCards([]);
          console.log(e);
        });
    setIsLoading(false);
  }, [searchTerm, address, router.pathname]);

  return (
    <>
      <SearchBar
        updateFunction={(search) => {
          setSearchTerm(search);
        }}
        endpoint=""
      />

      {isLoading ? <Loading /> : <Cards cards={cards} />}

      {cards?.length === 0 && (
        <div className="flex justify-center items-center h-screen">
          <div className="max-w-2xl w-full border border-gray-300 bg-white p-8 text-center hover:transform hover:scale-105 hover:shadow-lg">
            <h2>
              Looks like you have no content published or pending. Go ahead and
              publish a content.
            </h2>
            <button
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded mt-4"
              onClick={() => router.push("/create")}
            >
              Publish
            </button>
          </div>
        </div>
      )}
    </>
  );
};

const MyWorksPage = () => (
  <Web3AuthContextProvider>
    <Layout>
      <MyWorks />
    </Layout>
  </Web3AuthContextProvider>
);

export default MyWorksPage;
