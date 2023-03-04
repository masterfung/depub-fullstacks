import axios from "axios";
import indexContent from "./indexer";

export interface PublishParams {
  title: string;
  description: string;
  author: string;
  files: File[];
}

const publishContent = async (params: PublishParams) => {
  const { title, description, author, files } = params;

  const data = new FormData();
  files.forEach((file) => {
    data.append(`${file.name}${file.size}`, file);
  });

  const url = "api/publish";

  const result = await axios({
    url,
    method: "POST",
    data,
  });

  if (result.status !== 200) {
    return "";
  }

  const fileNames = files.map((f) => f.name);
  const directoryCID = result.data as string;

  return await indexContent({
    title,
    description,
    author,
    fileNames,
    directoryCID,
  });
};

export default publishContent;
