import { useContext } from "react";
import Layout from "../../components/Layout";
import { Web3AuthContext, Web3AuthContextProvider } from "../../providers/Web3AuthContextProvider";

const Pending = () => {
  const { account } = useContext(Web3AuthContext);
  console.log('account from pending', account);
  return (
    <div>Pending {account}</div>
  );
};

const PendingPage = () => (
  <Web3AuthContextProvider>
    <Layout>
      <Pending />
    </Layout>
  </Web3AuthContextProvider>
);

export default PendingPage;
