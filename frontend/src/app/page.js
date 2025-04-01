'use client';
import { useRouter } from 'next/navigation';
import LoginPage from './login/page';
import Link from 'next/link';

export default function Home() {
  const router = useRouter();

  const handleRegisterClick = () => {
    router.push('/register');
  };

  return (
    <div className="relative min-h-screen select-none flex">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 z-0"></div>

      <div className="absolute inset-0 flex items-center justify-center z-0">
        <h1
          className="text-[15vw] font-bold uppercase text-white mix-blend-exclusion leading-none"
          style={{
            opacity: 0.15,
            WebkitTextFillColor: 'transparent',
            WebkitBackgroundClip: 'text',
            backgroundImage: 'linear-gradient(to right, #333, #555, #888, #aaa)',
          }}
        >
          DEMO <span className="text-black">SCHOOL</span>
        </h1>
      </div>

      <Link href="/admin/login">
      <div className="relative top-4 left-4 z-10 text-white font-bold text-xl" style={{
            opacity: 1,
            WebkitTextFillColor: 'transparent',
            WebkitBackgroundClip: 'text',
            backgroundImage: 'linear-gradient(to right, #333, #555, #888, #888)',
          }}>
      Admin
      </div>
      </Link>
      <Link href="/"> 
      <div className="absolute top-4 right-4 z-10 text-white font-bold text-xl">
      Demo School
      </div>
      </Link>



      <div className="relative z-10 flex w-full">
        <div className="w-1/2 flex flex-col justify-center items-center p-8">
          <div className="w-full px-4">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">
              Steps to Apply Online
            </h2>
            <ol className="list-decimal ml-6 mb-4 text-lg text-gray-700">
              <li>Fill out the registration form</li>
              <li>Submit with all details </li>
              <li>Get back to login</li>
              <li>Wait for confirmation</li>
            </ol>
            <button
              onClick={handleRegisterClick}
              className="p-3 rounded-lg bg-green-700 text-white mix-blend-difference hover:bg-green-600 hover:mix-blend-normal transition-all duration-300"
            >
              New Candidate - Register Here 
            </button>
          </div>
        </div>

        <div className="w-1/2 flex flex-col justify-center items-center p-8">
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
    </div>
  );
}
