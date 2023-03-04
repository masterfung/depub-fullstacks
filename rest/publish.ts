import IPFSWriteClient from "../pages/api/src/ipfs/write";

interface PublishParams {
  title: string;
  description: string;
  author: string;
  files: File[];
}

const publishContent = async (params: PublishParams) => {
  const { title, description, author, files } = params;

  const client = new IPFSWriteClient();
  const directoryParams = files.map((f) => ({
    path: f.name,
    content: f.stream(),
  }));

  // eslint-disable-next-line
  // @ts-ignore
  const result = client.writeDirectory(directoryParams);

  let directoryCID = "";
  const uploadedFileNames = [];
  for await (const res of result) {
    if (res.path === "") {
      directoryCID = res.cid.toString();
    }
    uploadedFileNames.push(res.path);
  }

  if (directoryCID === "") {
    return "";
  }

  const url = "api/indexer";

  const postResult = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title,
      description,
      author,
      directoryCID,
      fileNames: uploadedFileNames,
    }),
  });

  if (postResult.status === 200) {
    return directoryCID;
  }

  return "";
};

export default publishContent;
