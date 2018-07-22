import express from 'express';
import handleRequest from './handleRequest';

const router = express.Router();

router.get('*', handleRequest);

export default router;
