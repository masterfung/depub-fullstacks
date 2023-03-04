const queryByCID = async (queryCID: string) => {
  const url = `../api/queryByCID?cid=${queryCID}`;
  console.log(`URL`);
  console.log(url);

  const result = await fetch(url, {
    method: "GET",
  });
  console.log(result);

  if (result.status !== 200) {
    return {};
  }

  return await result.json();
};

export default queryByCID;
