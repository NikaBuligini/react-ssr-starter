import express from 'express';
import fs from 'fs';
import path from 'path';
import handleRequest from './handleRequest';

const router = express.Router();

router.get('/', handleRequest);
