'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

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
        router.push('/login');
      } else {
        const errorData = await res.json();
        alert('Registration failed: ' + errorData.message);
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert('Registration failed!');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <div className="flex items-center justify-center mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-green-500 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 11c1.657 0 3-1.343 3-3V6a3 3 0 00-6 0v2c0 1.657 1.343 3 3 3z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 11h14a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2z"
            />
          </svg>
          <h2 className="text-2xl font-bold text-gray-800">
            New Candidate Register Here
          </h2>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Name:
            </label>
            <input
              type="text"
              placeholder="abhishek anand"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full p-2 border rounded focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Email:
            </label>
            <input
              type="email"
              placeholder="abhi@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 border rounded focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Password:
            </label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-2 border rounded focus:ring-2 focus:ring-green-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white p-3 rounded-lg"
          >
            Register
          </button>
        </form>

        <p className="text-center mt-4">
          Already have an account?{' '}
          <a
            href="/login"
            className="text-blue-500 hover:underline"
          >
            Login here
          </a>
        </p>
      </div>
    </div>
  );
}
