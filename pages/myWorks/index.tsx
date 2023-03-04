import { useContext } from "react";
import {
  Web3AuthContext,
  Web3AuthContextProvider,
} from "../../providers/Web3AuthContextProvider";
import Layout from "../../components/Layout";

const MyWorks = () => {
  const { account } = useContext(Web3AuthContext);
  console.log("account", account);

  return <div>{account ? "Protected View" : "Need to login to see"}</div>;
};

const MyWorksPage = () => (
  <Web3AuthContextProvider>
    <Layout>
      <MyWorks />
    </Layout>
  </Web3AuthContextProvider>
);

export default MyWorksPage;
