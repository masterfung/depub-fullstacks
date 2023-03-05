import type { NextPage } from "next";
import dynamic from "next/dynamic";
import { Web3AuthContextProvider } from "../providers/Web3AuthContextProvider";

const App = dynamic(
  () => {
    return import("./App");
  },
  { ssr: false }
);

const Home: NextPage = () => {
  return (
    <Web3AuthContextProvider>
      <App />
    </Web3AuthContextProvider>
  );
};

export default Home;
