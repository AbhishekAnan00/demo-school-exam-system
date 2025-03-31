import db from '../config/firebase.js';

export const addQuestion = async (questionData) => {
  const questionRef = db.collection('questions');
  await questionRef.add(questionData);
};

export const getQuestions = async () => {
  const snapshot = await db.collection('questions').get();
  let questions = [];
  snapshot.forEach((doc) => {
    questions.push({ id: doc.id, ...doc.data() });
  });
  return questions;
};
