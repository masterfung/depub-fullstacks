import { useState, useEffect } from "react";
import Cards from "../components/Cards";

import Layout from "../components/Layout";

import SearchBar from "../components/SearchBar";
import { CardsType } from "../types/app";
import query from "../rest/query";

function App() {
  const [cards, setCards] = useState<CardsType>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    query(searchTerm)
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
      })
      .catch((e) => {
        setCards([]);
        console.log(e);
      });
  }, [searchTerm]);

  return (
    <Layout>
      <SearchBar
        updateFunction={(search) => {
          setSearchTerm(search);
        }}
        endpoint=""
      />

      <Cards cards={cards} />
    </Layout>
  );
}

export default App;
