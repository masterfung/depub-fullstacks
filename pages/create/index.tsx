import Form from "../../components/Form";
import Layout from "../../components/Layout";

export default function Create() {
  return (
    <Layout>
      <div className="mt-3 border p-5 bg-white w-5/6 mx-auto">
        <h1 className="text-center">Create Form</h1>
        <Form isEdit={false} />
      </div>
    </Layout>
  );
}
