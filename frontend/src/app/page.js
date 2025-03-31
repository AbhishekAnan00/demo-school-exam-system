'use client';

import { useRouter } from 'next/navigation';
import LoginPage from './login/page';

export default function Home() {
  const router = useRouter();

  const handleRegisterClick = () => {
    router.push('/register');
  };

  return (
  <>
    <div
      className="w-full flex flex-col justify-between md:flex-row bg-gray-100 bg-center"
    >
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 bg-white bg-opacity-90">
        <div className="w-full px-4">
          <img
            src="/exam-background.jpg"
            alt="Application Steps"
            className="w-full rounded-lg shadow-md mb-4"
          />
          <h2 className="text-3xl font-bold mb-4 text-gray-800">
            Steps to Apply Online
          </h2>
          <ol className="list-decimal ml-6 mb-4 text-lg text-gray-700">
            <li>Fill out the registration form</li>
            <li>Submit necessary documents</li>
            <li>Pay the examination fee</li>
            <li>Wait for confirmation</li>
          </ol>

          <button
            onClick={handleRegisterClick}
            className="w-full bg-green-500 hover:bg-green-600 text-white p-3 rounded-lg"
          >
            New Candidate - Register Here
          </button>
        </div>
      </div>

      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 bg-white bg-opacity-90">
        <div className="w-full px-4">
          <div className="flex items-center justify-center mb-6">

            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-yellow-500 mr-2"
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
            <h2 className="text-sm font-bold text-center text-gray-800">
              Only Registered Candidate Login Here
            </h2>
          </div>
          <LoginPage />
        </div>
      </div>
    </div>
    </>
  );
}
