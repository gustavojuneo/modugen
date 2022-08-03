// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { generateModule } from '../../utils/moduleGenerator'

type Data = {
  message: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'POST') {
    const data = req.body;
    generateModule(data);
    res.status(200).json({ message: 'Arquivo gerado com sucesso!' })
  }

}
