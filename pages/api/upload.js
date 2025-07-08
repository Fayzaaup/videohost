import formidable from 'formidable';
import fs from 'fs';
import { uploadToNekochii } from '../../lib/upload';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  const form = formidable({ uploadDir: '/tmp', keepExtensions: true });

  form.parse(req, async (err, fields, files) => {
    if (err || !files.file) {
      return res.status(500).json({ error: 'Failed to receive file.' });
    }

    const filePath = files.file[0].filepath;

    try {
      const buffer = fs.readFileSync(filePath);
      const result = await uploadToNekochii(buffer);
      res.json(result);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });
}