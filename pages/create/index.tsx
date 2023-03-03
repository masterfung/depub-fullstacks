import { useState } from "react";
import Form from "../../components/Form";
import Layout from "../../components/Layout";

export default function Create() {
  return (
    <Layout>
      <div className="flex mx-auto mt-3 border p-5 bg-white">
        <Form isEdit={false} cid={undefined} />
      </div>
    </Layout>
  );
}
