import express from 'express';
import { getExamResults, getResultsByStudent } from '../controllers/examController.js';

const router = express.Router();

router.get('/all', getExamResults);
router.get('/:studentId', getResultsByStudent);

export default router;

