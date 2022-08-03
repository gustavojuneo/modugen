// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { getKeys } from '../../../utils/moduleGenerator/generateFile'

type Data = {
  keys: string[]
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'GET') { 
    const keys = getKeys();
    res.status(200).json({ keys })
  }
}
