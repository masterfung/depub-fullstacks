import Layout from "../../components/Layout";
import { useRouter } from "next/router";

const POSTS_DATA = [
  {
    id: 1,
    title: "Lorem Ipsum",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    tags: ["tag1", "tag2", "tag3"],
    author: "John Doe",
    files: [
      {
        name: "file1.pdf",
        size: "1.2MB",
        format: "pdf",
        versions: ["v1.0", "v1.1"],
        publishedDate: "2022-05-01",
      },
      {
        name: "file2.docx",
        size: "820KB",
        format: "docx",
        versions: ["v1.0"],
        publishedDate: "2022-04-29",
      },
    ],
  },
  {
    id: 2,
    title: "Nulla vel sapien",
    description: "Nulla vel sapien et lacus ultricies feugiat nec vel turpis.",
    tags: ["tag1", "tag4"],
    author: "Jane Smith",
    files: [
      {
        name: "file1.pdf",
        size: "1.6MB",
        format: "pdf",
        versions: ["v1.0", "v1.1"],
        publishedDate: "2022-05-02",
      },
    ],
  },
  {
    id: 3,
    title: "Phasellus eget",
    description: "Phasellus eget lacus ac quam aliquam mattis.",
    tags: ["tag2", "tag5"],
    author: "David Brown",
    files: [
      {
        name: "file1.docx",
        size: "720KB",
        format: "docx",
        versions: ["v1.0", "v1.1", "v2.0"],
        publishedDate: "2022-04-30",
      },
      {
        name: "file2.pdf",
        size: "3.2MB",
        format: "pdf",
        versions: ["v1.0", "v1.1", "v1.2"],
        publishedDate: "2022-05-03",
      },
    ],
  },
  {
    id: 4,
    title: "Fusce interdum",
    description: "Fusce interdum orci at nulla lacinia consequat.",
    tags: ["tag1", "tag3"],
    author: "Emily Green",
    files: [
      {
        name: "file1.pdf",
        size: "2.1MB",
        format: "pdf",
        versions: ["v1.0"],
        publishedDate: "2022-05-02",
      },
      {
        name: "file2.docx",
        size: "540KB",
        format: "docx",
        versions: ["v1.0", "v1.1"],
        publishedDate: "2022-04-30",
      },
    ],
  },
];

const Post = () => {
  const router = useRouter();
  const { pid } = (router.query as { pid: string }) || { pid: "1" };
  const post = POSTS_DATA[parseInt(pid) - 1 || 1] || POSTS_DATA[1];
  console.log("postData", post);

  // we will need to query the endpoint to get the data back from the cid/pid and display the data here

  return (
    <Layout>
      <div className="p-8 m-4 border-2 border-gray-200 rounded-lg">
        <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
        <p className="text-gray-600 mb-4">{post.description}</p>
        <div className="mb-4">
          <span className="font-bold">Tags: </span>
          {post.tags.map((tag, index) => (
            <span
              key={index}
              className="bg-gray-200 px-2 py-1 rounded-full text-sm font-semibold text-gray-700 mr-2"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="mb-4">
          <span className="font-bold">Author: </span>
          <span className="text-gray-600">{post.author}</span>
        </div>
        <div className="mb-4">
          <span className="font-bold">Files:</span>
          <ul className="list-disc list-inside">
            {post.files.map((file, index) => (
              <li key={index}>
                <span className="font-semibold">{file.name}</span> ({file.size},{" "}
                {file.format})
                <div className="ml-4">
                  <span className="font-bold">Versions:</span>{" "}
                  {file.versions.join(", ")}
                </div>
                <div className="ml-4">
                  <span className="font-bold">Published Date:</span>{" "}
                  {file.publishedDate}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default Post;
