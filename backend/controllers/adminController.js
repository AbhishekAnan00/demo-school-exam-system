import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@example.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123'; 
export const adminLogin = async (req, res) => {
  const { email, password } = req.body;
  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    const token = jwt.sign(
      { id: "adminId", email: ADMIN_EMAIL, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    return res.status(200).json({
      token,
      user: { id: "adminId", name: "Admin", email: ADMIN_EMAIL, role: "admin" }
    });
  } else {
    return res.status(401).json({ message: 'Invalid admin credentials' });
  }
};
