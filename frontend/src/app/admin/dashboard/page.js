'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser || storedUser === 'undefined') {
      alert('Please log in as admin.');
      router.push('/admin/login');
    } else {
      try {
        const user = JSON.parse(storedUser);
        if (user.role !== 'admin') {
          alert('Access denied: You are not an admin.');
          router.push('/admin/login');
        }
      } catch (error) {
        console.error('Error parsing user info:', error);
        alert('Invalid user info. Please log in again.');
        router.push('/admin/login');
      }
    }
  }, [router]);

  useEffect(() => {
    async function fetchResults() {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('http://localhost:5000/api/results/all', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          setResults(data);
        } else {
          console.error('Failed to fetch exam results');
        }
      } catch (error) {
        console.error('Error fetching exam results:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchResults();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Admin Dashboard</h1>
      {loading ? (
        <p className="text-center">Loading results...</p>
      ) : results.length === 0 ? (
        <p className="text-center">No exam submissions found.</p>
      ) : (
        <div className="space-y-6">
          {results.map((result) => (
            <div key={result.id} className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-2">
                {result.student?.name || 'Unknown Student'}{' '}
                {result.student?.email && (
                  <span className="text-sm text-gray-600">
                    ({result.student.email})
                  </span>
                )}
              </h2>
              <p className="text-gray-700 mb-2">
                <span className="font-semibold">Exam ID:</span> {result.examId}
              </p>
              <p className="text-gray-700 mb-4">
                <span className="font-semibold">Submitted At:</span>{' '}
                {result.submittedAt && result.submittedAt._seconds
                  ? new Date(result.submittedAt._seconds * 1000).toLocaleString()
                  : 'N/A'}
              </p>
              <div>
                <h3 className="text-xl font-bold mb-2">Answers:</h3>
                <ul className="list-disc ml-6 space-y-1">
                  {result.answers &&
                    Object.entries(result.answers).map(([questionKey, answer]) => (
                      <li key={questionKey}>
                        <span className="font-semibold">{questionKey}:</span> {answer}
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
