import { useState } from 'react'
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
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
    <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="title">
        Title
        </label>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="title" type="text" placeholder="Enter title" />
    </div>
    <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="description">
        Description
        </label>
        <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="description" placeholder="Enter description"></textarea>
    </div>
    <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="file-upload">
        File Upload
        </label>
        <input className="form-input" type="file" id="file-upload" />
    </div>
    <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="multiselect">
        Multi-select Box
        </label>
        <select className="form-multiselect w-full" id="multiselect" multiple>
        <option>Option 1</option>
        <option>Option 2</option>
        <option>Option 3</option>
        <option>Option 4</option>
        <option>Option 5</option>
        </select>
    </div>
    <div className="mb-4">
      <label htmlFor="tags" className="block font-medium text-gray-700">Tags</label>
      <select id="tags" name="tags" className="form-select mt-1 block w-full" required>
        <option value="">Select a tag</option>
        <option value="General">General</option>
        <option value="Whistle Blowing">Whistle Blowing</option>
      </select>
      <datalist id="tags-list">
        <option value="General" />
        <option value="Whistle Blowing" />
      </datalist>
    </div>
    <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="version">
        Version
        </label>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="version" type="text" placeholder="Enter version" />
    </div>
    <div className="flex items-center justify-between">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
        Submit
        </button>
    </div>
        </form>
    </div>
    </Layout>

  )
}