import db from '../config/firebase.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userSnapshot = await db.collection('users').where('email', '==', email).get();
    if (!userSnapshot.empty) {
      return res.status(400).json({ message: 'User already exists' });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { name, email, password: hashedPassword, role: 'student', createdAt: new Date() };
    await db.collection('users').add(newUser);
    
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Registration failed', error });
  }
};


export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userSnapshot = await db.collection('users').where('email', '==', email).get();
    if (userSnapshot.empty) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    let userData;
    userSnapshot.forEach((doc) => {
      userData = { id: doc.id, ...doc.data() };
    });
    
    const isMatch = await bcrypt.compare(password, userData.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    const token = jwt.sign(
      { id: userData.id, email: userData.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    
    console.log('User Data Returned:', userData);
    
    res.status(200).json({ 
      token, 
      user: { id: userData.id, name: userData.name, email: userData.email, role: userData.role }
    });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Login failed', error });
  }
};

