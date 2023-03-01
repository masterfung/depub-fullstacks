import { useState } from 'react';
import { useForm } from 'react-hook-form';

const Form = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [files, setFiles] = useState<File[]>([]);

  const onSubmit = (data: any) => {
    console.log(data);
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (fileList) {
      setFiles(Array.from(fileList));
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 font-bold mb-2">Title <span className="text-red-600">*</span></label>
          <input type="text" {...register("title", { required: true })} className="form-input w-full border-gray-400" />
          {errors.title && <span className="text-sm text-red-600">Please enter a title.</span>}
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 font-bold mb-2">Description <span className="text-red-600">*</span></label>
          <textarea {...register("description", { required: true })} className="form-textarea w-full border-gray-400"></textarea>
          {errors.description && <span className="text-sm text-red-600">Please enter a description.</span>}
        </div>
        <div className="mb-4">
          <label htmlFor="files" className="block text-gray-700 font-bold mb-2">Upload Files <span className="text-red-600">*</span></label>
          <div className="flex items-center border-dashed border-2 border-gray-400 p-2">
            <label htmlFor="file-upload" className="cursor-pointer flex items-center justify-center w-full">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
  <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z" clipRule="evenodd" />
</svg>

              <span className="text-gray-700 ml-2">Add files</span>
            </label>
            <input id="file-upload" type="file" multiple onChange={onFileChange} className="sr-only" />
          </div>
          {files.length > 0 && (
            <ul className="mt-2">
              {files.map((file) => (
                <li key={file.name} className="text-gray-700">{file.name}</li>
              ))}
            </ul>
          )}
          {errors.files && <span className="text-sm text-red-600">Please upload files.</span>}
        </div>
        <div className="mb-4">
          <label htmlFor="version" className="block text-gray-700 font-bold mb-2">Version <span className="text-red-600">*</span></label>
          <input type="text" {...register("version", { required: true })} className="form-input w-full border-gray-400" />
          {errors.version && <span className="text-sm text-red-600">Please enter a version.</span>}
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
      </form>
    </div>
  );
};

export default Form;
