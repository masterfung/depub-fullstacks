import { useState } from 'react'
import Form from '../../components/Form';
import Layout from '../../components/Layout';
import { useRouter } from 'next/router';

export default function Edit() {
    const router = useRouter();
    const { cid } = router.query;
    console.log('CID', cid)


  return (
    <Layout>
        <div className="flex mx-auto mt-3 border p-5 bg-white">
        <Form isEdit={true} cid={cid as string} />
        </div>
    </Layout>
  )
}