import db from '../config/firebase.js';

export const uploadQuestions = async (req, res) => {
  try {
    const questions = req.body.questions;
    const batch = db.batch();
    const questionsRef = db.collection('questions');

    questions.forEach((q) => {
      const docRef = questionsRef.doc();
      batch.set(docRef, q);
    });

    await batch.commit();
    res.status(201).json({ message: 'Questions uploaded successfully' });
  } catch (error) {
    console.error('Error uploading questions:', error);
    res.status(500).json({ error: 'Error uploading questions' });
  }
};

export const fetchQuestions = async (req, res) => {
  try {
    const snapshot = await db.collection('questions').get();
    let questions = [];
    snapshot.forEach((doc) => {
      questions.push({ id: doc.id, ...doc.data() });
    });

    questions = questions.sort(() => 0.5 - Math.random()).slice(0, 10);
    res.status(200).json(questions);
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).json({ error: 'Error fetching questions' });
  }
};
