import { useState } from 'react'
import Form from '../../components/Form';
import Layout from '../../components/Layout';

const navigation = [
  { name: 'Published', href: '/' },
  { name: 'Pending', href: '/pending' },
]

export default function Create() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <Layout>
        <div className="max-w-2xl mx-auto mt-3">
        <Form />
        </div>
    </Layout>
  )
}