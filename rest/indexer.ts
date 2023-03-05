interface File {
  name: string;
  size: number;
}

interface IndexParams {
  title: string;
  description: string;
  author: string;
  directoryCID: string;
  files: File[];
}

const indexContent = async (params: IndexParams) => {
  const { title, description, author, directoryCID, files } = params;

  const url = "api/indexer";

  const postResult = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title,
      description,
      author,
      directoryCID,
      files,
    }),
  });

  if (postResult.status === 200) {
    return directoryCID;
  }

  return "";
};

export default indexContent;
