const download = async (directoryCID: string, fileName: string) => {
  const url = `../api/download?directoryCID=${directoryCID}&fileName=${fileName}`;
  console.log(`URL: ${url}`);

  fetch(url, {
    method: "GET",
  })
    .then((res) => {
      return res.blob();
    })
    .then((blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      if (fileName) {
        a.setAttribute("download", fileName);
      } else {
        a.setAttribute("download", `${directoryCID}.tgz`);
      }
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    })
    .catch((e) => {
      console.log(e);
    });

  return "";
};

export default download;
