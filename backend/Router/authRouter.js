import express from 'express';
import { refreshToken } from '../Controller/authController.js';

const router = express.Router();

router.post('/refreshToken', refreshToken);

export default router;
