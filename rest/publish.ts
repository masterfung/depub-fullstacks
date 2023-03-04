import axios from "axios";

interface PublishParams {
  title: string;
  description: string;
  author: string;
  files: File[];
}

const publishContent = async (params: PublishParams) => {
  const { title, description, author, files } = params;

  const data = new FormData();
  data.append("metadata", `${title}${description}`);
  data.append("file", files[0]);

  const url = "api/publish";

  const result = await axios({
    url,
    method: "POST",
    data,
  });

  if (result.status !== 200) {
    return "";
  }

  return result.data as string;
};

export default publishContent;
