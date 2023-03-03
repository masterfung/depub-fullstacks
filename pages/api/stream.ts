import type { NextApiRequest, NextApiResponse } from 'next';

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = (
  _req: NextApiRequest,
  res: NextApiResponse,
) => {
  // Get data from your database
  res.write('hello');
  res.write('world');
  res.status(200);
  res.end();
}

export default handler;
