import fs from 'fs';
import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {

    const filePath = path.join(process.cwd(), 'public', 'data', 'countries.json');

    if (req.method === 'GET') {

      const data = fs.readFileSync(filePath, 'utf-8');
      const sectorsData = JSON.parse(data);

      res.status(200).json(sectorsData);
    } else {
      res.setHeader('Allow', ['GET']);
      res.status(405).json({ message: `Method ${req.method} Not Allowed` });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
