const query = async (searchText: string) => {
  const url = `api/query?searchTerm=${searchText}`;
  console.log(`URL`);
  console.log(url);

  const result = await fetch(url, {
    method: "GET",
  });

  if (result.status !== 200) {
    return [];
  }

  return await result.json();
};

export default query;
