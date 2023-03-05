import { useContext, useEffect, useState } from "react";
import Layout from "../../components/Layout";
import {
  Web3AuthContext,
  Web3AuthContextProvider,
} from "../../providers/Web3AuthContextProvider";
import { useRouter } from "next/router";
import { CardsType } from "../../types/app";
import query from "../../rest/query";
import Cards from "../../components/Cards";
import Loading from "../../components/Loading";
import SearchBar from "../../components/SearchBar";

enum STATUS {
  UNFUNDED = "UNFUNDED",
  FUNDED = "FUNDED",
  BLACKLISTED = "BLACKLISTED",
}

const Pending = () => {
  const { account } = useContext(Web3AuthContext);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [cards, setCards] = useState<CardsType>([]);
  const [isLoading, setIsLoading] = useState(false);
  console.log("account from Pending", account);
  const router = useRouter();
  
  useEffect(() => {
    setIsLoading(true);
    query(searchTerm, STATUS.UNFUNDED)
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
            version: "0.0.0",
          }))
        );
        setIsLoading(false);
      })
      .catch((e) => {
        setCards([]);
        console.log(e);
      });
  }, [searchTerm, router.pathname]);

  return <>
  <SearchBar
        updateFunction={(search) => {
          setSearchTerm(search);
        }}
        endpoint=""
      />

      {isLoading ? <Loading /> : <Cards cards={cards} />}
  </>;
};

const PendingPage = () => (
  <Web3AuthContextProvider>
    <Layout>
      <Pending />
    </Layout>
  </Web3AuthContextProvider>
);

export default PendingPage;