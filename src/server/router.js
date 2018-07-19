import express from 'express';
import fs from 'fs';
import path from 'path';

const router = express.Router();

let template = fs.readFileSync(path.resolve(__dirname, '../../dist/client/template.html'));

template.toString();

router.get('/', (req, res) => {
  res.write(template);
  res.end();
});

export default router;
