import nc from 'next-connect';
import type { NextApiRequest, NextApiResponse } from 'next';
import upload from '@/app/libs/multer';

export const config = {
  api: {
    bodyParser: false,
  },
};

nc<NextApiRequest, NextApiResponse>()
  .use(upload.single('image'))
  .put(async (req: any, res: any) => {
    console.log('req.file', req.file);
    console.log('req.body', req.body);
  });
