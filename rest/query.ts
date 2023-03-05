enum STATUS {
  UNFUNDED = "UNFUNDED",
  FUNDED = "FUNDED",
  BLACKLISTED = "BLACKLISTED",
}

const query = async (searchText: string, status: STATUS) => {
  const url = `api/query?searchTerm=${searchText}&status=${status}`;
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
