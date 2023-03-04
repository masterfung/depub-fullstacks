import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { fileSize } from "../helper/utility";
import { Web3AuthContext } from "../providers/Web3AuthContextProvider";
import publish from "../rest/publish";

interface FormType {
  title: string;
  description: string;
  author: string;
}

const Form = ({
  isEdit,
  cid,
}: {
  isEdit: boolean;
  cid: string | undefined;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [files, setFiles] = useState<File[]>([]);
  const { account } = useContext(Web3AuthContext);
  const [successSubmission, setSuccessSubmission] = useState(false);

  const onSubmit = async (data: any) => {
    const formInput = data as FormType;
    const directoryID = await publish({
      title: formInput.title,
      description: formInput.description,
      author: formInput.author,
      files,
    });

    console.log(directoryID);

  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (fileList) {
      setFiles(Array.from(fileList));
    }
  };

  // we need author field
  // we move versioning and incrementing the backend by logic if no

  return (
    <div className="max-w-2xl mx-auto ">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
            Title <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            {...register("title", { required: true })}
            className="form-input w-full border-gray-400 border h-10 px-3 py-2 text-gray-700 placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300"
          />
          {errors.title && (
            <div className="text-sm text-red-600">Please enter a title.</div>
          )}
        </div>
        <div className="mb-4 w-300">
          <label
            htmlFor="description"
            className="block text-gray-700 font-bold mb-2"
          >
            Description <span className="text-red-600">*</span>
          </label>
          <textarea
            {...register("description", { required: true })}
            className="form-textarea w-full border-gray-400 border h-24 px-3 py-2 text-gray-700 placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300"
          ></textarea>
          {errors.description && (
            <div className="text-sm text-red-600">
              Please enter a description.
            </div>
          )}
        </div>
        <div className="mb-4 w-300">
          <label
            htmlFor="author"
            className="block text-gray-700 font-bold mb-2"
          >
            Author
          </label>
          <input
            type="author"
            disabled={true}
            {...register("author", { required: false })}
            value={account || ""}
            className="form-input w-full border-gray-400 border h-10 px-3 py-2 text-gray-700 placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 cursor-not-allowed"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="files" className="block text-gray-700 font-bold mb-2">
            Upload Files <span className="text-red-600">*</span>
          </label>
          <div className="flex items-center border-dashed border-2 border-gray-400 p-2">
            <label
              htmlFor="file-upload"
              className="cursor-pointer flex items-center justify-center w-full"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z"
                  clipRule="evenodd"
                />
              </svg>

              <span className="text-gray-700 ml-2">Add files</span>
            </label>
            <input
              id="file-upload"
              type="file"
              multiple
              {...register("file")}
              onChange={onFileChange}
              className="sr-only"
            />
          </div>
          {files.length > 0 && (
            <ul className="mt-2">
              {files.map((file) => (
                <li key={file.name} className="text-gray-700">{`${
                  file.name
                } - ${fileSize(file.size)}`}</li>
              ))}
            </ul>
          )}
          {errors.files && (
            <div className="text-sm text-red-600">Please upload files.</div>
          )}
        </div>
        {isEdit && (
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-gray-700 font-bold mb-2"
            >
              Content ID
            </label>
            <input
              type="text"
              disabled
              className="form-input w-full border-gray-400 border h-10 cursor-not-allowed"
              value={cid}
            />
          </div>
        )}
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Form;
