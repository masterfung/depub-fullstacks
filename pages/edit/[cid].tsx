import Form from "../../components/Form";
import Layout from "../../components/Layout";
import { useRouter } from "next/router";

export default function Edit() {
  const router = useRouter();
  const { cid } = router.query;
  console.log("CID", cid);

  return (
    <Layout>
      <div className="mt-3 border p-5 bg-white w-5/6 mx-auto">
        <Form isEdit={true} cid={cid as string} />
      </div>
    </Layout>
  );
}
