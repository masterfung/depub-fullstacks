import { useEffect, useState } from "react";
import Cards from "../components/Cards";
import { CardsType } from "../types/app";

import Layout from "../components/Layout";

import SearchBar from "../components/SearchBar";

const CARDS_DATA = [
  {
    id: 1,
    title: "Card 1",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ut volutpat magna.",
    author: "John Doe",
    version: "1.0.0",
  },
  {
    id: 2,
    title: "Card 2",
    description:
      "Pellentesque in eros vestibulum, ultrices ipsum sed, semper lectus. Sed sit amet sollicitudin arcu.",
    author: "Jane Doe",
    version: "1.1.0",
  },
  {
    id: 3,
    title: "Card 3",
    description:
      "Donec vitae eros ac dolor blandit fermentum. Nulla facilisi. Nulla facilisi.",
    author: "Bob Smith",
    version: "2.0.0",
  },
  {
    id: 4,
    title: "Card 4",
    description:
      "Aliquam tempus nunc in nunc viverra, a mattis risus convallis. Proin volutpat turpis at libero dictum vulputate.",
    author: "Sarah Johnson",
    version: "1.2.3",
  },
  {
    id: 5,
    title: "Card 5",
    description:
      "Curabitur consequat faucibus leo, ac aliquet purus mattis sed. Suspendisse potenti.",
    author: "David Lee",
    version: "2.1.0",
  },
  {
    id: 6,
    title: "Card 6",
    description:
      "Vestibulum laoreet tortor eu tincidunt ultrices. Integer at lectus euismod, lobortis ante vel, varius nunc.",
    author: "Emily Davis",
    version: "1.0.1",
  },
  {
    id: 7,
    title: "Card 7",
    description:
      "Mauris lacinia libero sit amet justo consectetur, sed dignissim neque aliquet. Aliquam ac tristique est.",
    author: "Adam Smith",
    version: "3.0.0",
  },
  {
    id: 8,
    title: "Card 8",
    description:
      "Ut et odio nec dolor congue bibendum. Nunc euismod tellus quis neque dictum ullamcorper.",
    author: "Olivia Johnson",
    version: "2.2.0",
  },
  {
    id: 9,
    title: "Card 9",
    description:
      "Morbi eget dolor euismod, vehicula dolor non, mattis nisl. In non ex eu dolor posuere fermentum.",
    author: "Michael Kim",
    version: "1.3.0",
  },
  {
    id: 10,
    title: "Card 10",
    description:
      "Phasellus sit amet nibh in ipsum venenatis dictum vel id dui. Morbi sagittis orci eget velit dictum interdum.",
    author: "Amanda Lee",
    version: "2.3.1",
  },
];

function App() {
  const [updateData, setUpdateData] = useState([]);

  return (
    <Layout>
      <SearchBar updateFunction={setUpdateData} endpoint="" />

      <Cards cards={CARDS_DATA} />
    </Layout>
  );
}

export default App;
