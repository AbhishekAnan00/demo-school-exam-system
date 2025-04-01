'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import Link from 'next/link';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.user.role !== 'admin') {
          alert('Access denied: You are not an admin.');
          return;
        }
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        alert('Admin login successful!');
        router.push('/admin/dashboard');
      } else {
        const errorData = await res.json();
        alert('Login failed: ' + errorData.message);
      }
    } catch (error) {
      console.error('Admin login error:', error);
      alert('Login failed!');
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-gray-100">
     
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 flex items-center justify-center">
        <h1
          className="text-[15vw] font-bold uppercase text-white mix-blend-exclusion leading-none"
          style={{
            WebkitTextFillColor: 'transparent',
            WebkitBackgroundClip: 'text',
            backgroundImage:
              'linear-gradient(to right, #333, #555, #888, #aaa)',
          }}
        >
          DEMO <span className="text-black">SCHOOL</span>
        </h1>
      </div>

      <div className="relative z-10 text-white py-4 px-6 flex items-center justify-between">
        <span className="font-semibold"> <Link href="/">Demo School</Link></span>
        <span className="font-semibold"><Link href="/admin/dashboard">Admin Dashboard</Link> </span>
      </div>

      <div className="relative z-10 flex-grow flex items-center justify-center p-4">
        <motion.div
          className="w-full max-w-md bg-white p-8 rounded-md shadow-md"
          initial={{ scale: 0.8, rotate: -10, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <h1 className="text-2xl font-bold mb-6 text-center text-gray-700">
            Admin Login
          </h1>
          <form onSubmit={handleAdminLogin}>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-1">
                Email:
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  placeholder="admin@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-10 p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-1">
                Password:
              </label>
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  placeholder="admin123"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-10 p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Sign In
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}


