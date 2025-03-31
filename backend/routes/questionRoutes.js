import express from 'express';
import { uploadQuestions, fetchQuestions } from '../controllers/questionController.js';

const router = express.Router();

router.post('/upload', uploadQuestions);
router.get('/fetch', fetchQuestions);

export default router;
