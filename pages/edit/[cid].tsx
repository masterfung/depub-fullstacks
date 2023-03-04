import Form from "../../components/Form";
import Layout from "../../components/Layout";
import { useRouter } from "next/router";
import {
  Web3AuthContextProvider,
  useWeb3AuthContext,
} from "../../providers/Web3AuthContextProvider";

function Edit() {
  const router = useRouter();
  const { cid } = router.query;
  console.log("CID", cid);
  const { account } = useWeb3AuthContext();

  return (
    <div className="mt-3 border p-5 bg-white w-5/6 mx-auto">
      <h1 className="">Edit Form</h1>
      <Form isEdit={true} cid={cid as string} />
    </div>
  );
}

const EditPage = () => (
  <Web3AuthContextProvider>
    <Layout>
      <Edit />
    </Layout>
  </Web3AuthContextProvider>
);

export default EditPage;
