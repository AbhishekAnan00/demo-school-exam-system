'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FaEnvelope, FaLock } from 'react-icons/fa';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (res.ok) {
        const data = await res.json();
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        alert('Login successful!');
        router.push('/exam');
      } else {
        const errorData = await res.json();
        alert('Login failed: ' + errorData.message);
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('Login failed!');
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      className="w-full max-w-md mx-auto p-8 shadow-2xl rounded-lg"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h1 
        className="text-3xl font-bold mb-6 text-center text-blue-600"
        variants={childVariants}
      >
        Login
      </motion.h1>
      <motion.form 
        onSubmit={handleLogin} 
        className="space-y-6"
        variants={childVariants}
      >
        <div className="relative">
          <div className='relative'>
          <motion.div
              custom={2}
              initial="hidden"
              animate="visible"
            >
              <label className="block text-gray-700 font-medium mb-1 flex items-center">
                <FaEnvelope className="mr-2" />
                Email
              </label>
              <input
               type="email"
               value={email}
               required
               variants={childVariants}
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border rounded focus:outline-none"
              />
            </motion.div>

            <motion.div
              custom={3}
              initial="hidden"
              animate="visible"
            >
              <label className="block text-gray-700 font-medium mb-1 flex items-center mt-5">
                <FaLock className="mr-2" />
                Password
              </label>
              <input
               type="password"
               placeholder="Enter your password"
               value={password}
               onChange={(e) => setPassword(e.target.value)}
               required
               variants={childVariants}
                className="w-full p-2 border rounded focus:outline-none"
              />
            </motion.div>
          </div>
        </div>
        <motion.button 
          type="submit" 
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-white p-3 rounded-lg font-bold"
          variants={childVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Login
        </motion.button>
      </motion.form>
    </motion.div>
  );
}



