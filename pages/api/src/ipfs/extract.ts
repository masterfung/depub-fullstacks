import { pipe } from "it-pipe";
import * as Tar from "it-tar";

/**
 * Converts a tar-formatted bytestream into a header- & body-formatted
 * object.
 */
async function* tarballed(tarSource: any) {
  // eslint-disable-next-line
  yield* pipe(tarSource, Tar.extract(), async function* (source) {
    // eslint-disable-next-line
    for await (const entry of source) {
      yield {
        ...entry,
        body: entry.body,
      };
    }
  });
}

/**
 * Extracts a bytestream into an object of format
 * {
 *  header: Header,
 *  body: AsyncIterable<Uint8Array>,
 * }
 *
 * where Header is defined {@link https://github.com/alanshaw/it-tar#headers | here}.
 */
const extractFileContents = (byteStream: AsyncIterable<Uint8Array>) =>
  pipe(byteStream, tarballed, (source) => source);

export default extractFileContents;
