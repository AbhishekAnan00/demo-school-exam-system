import express from 'express';
import { getExamResults, submitExam } from '../controllers/examController.js';

const router = express.Router();

router.post('/submit', submitExam);

export default router;
