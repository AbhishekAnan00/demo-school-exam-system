import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import questionRoutes from './routes/questionRoutes.js';
import examRoutes from './routes/examRoutes.js';
import resultRoutes from "./routes/resultRoutes.js"
import adminRoutes from "./routes/adminRoutes.js"

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());


app.use('/api/auth', authRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/exam', examRoutes);
app.use('/api/results', resultRoutes);
app.use('/api/admin', adminRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
