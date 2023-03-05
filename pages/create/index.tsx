import Form from "../../components/Form";
import Layout from "../../components/Layout";
import { Web3AuthContextProvider } from "../../providers/Web3AuthContextProvider";

function Create() {
  return (
    <div className="mt-3 border p-5 bg-white w-5/6 mx-auto">
      <h1 className="text-center">Create Form</h1>
      <Form isEdit={false} />
    </div>
  );
}

const CreatePage = () => (
  <Web3AuthContextProvider>
    <Layout>
      <Create />
    </Layout>
  </Web3AuthContextProvider>
);

export default CreatePage;
