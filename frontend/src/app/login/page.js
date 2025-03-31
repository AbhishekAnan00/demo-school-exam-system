'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

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
        // Save token and user info in localStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        console.log('Stored token:', localStorage.getItem('token'));
        console.log('Stored user:', localStorage.getItem('user'));
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

  return (
    <div className="w-full">
    <h1 className="text-3xl font-bold mb-6 text-center">Login</h1>
    <form onSubmit={handleLogin}>
      <div className="mb-4">
        <label className="block text-gray-700">Email:</label>
        <input
          type="email"
          placeholder="abhi@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-2 border rounded mt-1"
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700">Password:</label>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-2 border rounded mt-1"
        />
      </div>
      <button type="submit" className="w-full bg-yellow-500 hover:bg-yellow-600 text-white p-3 rounded-lg">
        Login
      </button>
    </form>
    <p className="text-center mt-4">
      <a href="/forgot-password" className="text-red-500">
        Forgot Password?
      </a>
    </p>
  </div>
  );
}
