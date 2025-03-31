import db from '../config/firebase.js';

export const submitExam = async (req, res) => {
  const { examId, answers } = req.body;
  const studentInfo = req.user || req.body.student;  

  try {
    await db.collection('exam_submissions').add({
      examId,
      student: studentInfo, 
      answers,
      submittedAt: new Date(),
    });
    res.status(201).json({ message: 'Exam submitted successfully!' });
  } catch (error) {
    console.error('Error submitting exam:', error);
    res.status(500).json({ message: 'Exam submission failed', error });
  }
};
export const getExamResults = async (req, res) => {
  try {
    const snapshot = await db.collection('exam_submissions').get();
    let results = [];
    snapshot.forEach((doc) => {
      results.push({ id: doc.id, ...doc.data() });
    });
    res.status(200).json(results);
  } catch (error) {
    console.error('Error fetching exam results:', error);
    res.status(500).json({ message: 'Error fetching exam results', error });
  }
};



export const getResultsByStudent = async (req, res) => {
  try {
    const { studentId } = req.params;
    const snapshot = await db
      .collection('exam_submissions')
      .where('studentId', '==', studentId)
      .get();
    if (snapshot.empty) {
      return res.status(404).json({ message: 'No results found for this student' });
    }
    let results = [];
    snapshot.forEach((doc) => {
      results.push({ id: doc.id, ...doc.data() });
    });
    res.status(200).json(results);
  } catch (error) {
    console.error('Error fetching exam results by student:', error);
    res.status(500).json({ message: 'Error fetching exam results', error });
  }
};
