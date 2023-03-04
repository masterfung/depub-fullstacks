interface IndexParams {
  title: string;
  description: string;
  author: string;
  directoryCID: string;
  fileNames: string[];
}

const indexContent = async (params: IndexParams) => {
  const { title, description, author, directoryCID, fileNames } = params;

  const url = "api/indexer";

  const postResult = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title,
      description,
      author,
      directoryCID,
      fileNames,
    }),
  });

  if (postResult.status === 200) {
    return directoryCID;
  }

  return "";
};

export default indexContent;
