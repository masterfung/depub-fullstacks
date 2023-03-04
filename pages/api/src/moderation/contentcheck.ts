import ImageLabeler from "./labeling";
import Moderation from "./moderation";

interface Content {
  title: string;
  description: string;
  author: string;
  directoryCID: string;
  fileNames: string[];
}

const maxArtifactLimit = 10;

export default class ContentCheck {
  private labeler = new ImageLabeler();
  private moderation = new Moderation();
  private ipfsAddress = "https://ipfs.io/ipfs/";

  isPostable = async (content: Content) => {
    const labelSet = new Set<string>();

    const filteredFiles = content.fileNames.filter((file) => {
      const ext = file.split(".").pop() ?? "";
      return !["png", "jpg", "jpeg", "gif", "bmp", "svg"].includes(
        ext.toLowerCase()
      );
    });

    //todo double check if the link in here makes sense
    const results = await Promise.all(
      filteredFiles
        .slice(0, maxArtifactLimit)
        .map((img) =>
          this.labeler.getLabelsUrl(
            `${this.ipfsAddress}${content.directoryCID}/${img}`
          )
        )
    );

    results.flatMap((res) => res.labels).forEach((lbl) => labelSet.add(lbl));
    return await this.moderation.verify(
      content.title,
      content.description,
      Array.from(labelSet)
    );
  };
}
