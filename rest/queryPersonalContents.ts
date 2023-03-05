const query = async (searchText: string, address: string) => {
  const url = `api/query?searchTerm=${searchText}&address=${address}`;
  console.log(`URL ${url}`);

  const result = await fetch(url, {
    method: "GET",
  });

  if (result.status !== 200) {
    return [];
  }

  return await result.json();
};

export default query;
