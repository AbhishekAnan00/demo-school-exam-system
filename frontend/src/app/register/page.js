'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FaUserAlt, FaLock, FaEnvelope } from 'react-icons/fa';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      if (res.ok) {
        const data = await res.json();
        alert(data.message);
        router.push('/');
      } else {
        const errorData = await res.json();
        alert('Registration failed: ' + errorData.message);
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert('Registration failed!');
    }
  };

  const fieldVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: (i) => ({
      x: 0,
      opacity: 1,
      transition: { delay: i * 0.2 },
    }),
  };

  return (
    <div className="relative min-h-screen flex flex-col select-none">
    
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 flex items-center justify-center">
        <h1
          className="text-[15vw] font-bold uppercase text-white mix-blend-exclusion leading-none"
          style={{
            WebkitTextFillColor: 'transparent',
            WebkitBackgroundClip: 'text',
            backgroundImage: 'linear-gradient(to right, #333, #555, #888, #aaa)',
          }}
        >
          DEMO <span className="text-black">SCHOOL</span>
        </h1>
      </div>

      <div className="relative z-10 flex-grow flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white shadow-md rounded px-8 py-6 w-full max-w-sm"
        >
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg font-bold text-center mb-6"
          >
            Register
          </motion.h2>

          <form onSubmit={handleRegister} className="space-y-4">
            
            <motion.div
              custom={1}
              initial="hidden"
              animate="visible"
              variants={fieldVariants}
            >
              <label className="block text-gray-700 font-medium mb-1 flex items-center">
                <FaUserAlt className="mr-2" />
                Name
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full p-2 border rounded focus:outline-none"
              />
            </motion.div>

            <motion.div
              custom={2}
              initial="hidden"
              animate="visible"
              variants={fieldVariants}
            >
              <label className="block text-gray-700 font-medium mb-1 flex items-center">
                <FaEnvelope className="mr-2" />
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-2 border rounded focus:outline-none"
              />
            </motion.div>

            <motion.div
              custom={3}
              initial="hidden"
              animate="visible"
              variants={fieldVariants}
            >
              <label className="block text-gray-700 font-medium mb-1 flex items-center">
                <FaLock className="mr-2" />
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full p-2 border rounded focus:outline-none"
              />
            </motion.div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-bold text-sm"
            >
              Sign Up
            </motion.button>
          </form>
        </motion.div>
      </div>

      <div className="relative z-10 bg-gray-200 text-center text-xs text-gray-700 py-2">
        @copyright ~ AA
      </div>
    </div>
  );
}










