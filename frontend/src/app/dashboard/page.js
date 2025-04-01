// 'use client';

// import { useState, useEffect } from 'react';

// export default function Dashboard() {
//   const [results, setResults] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function fetchResults() {
//       try {
//         const res = await fetch('http://localhost:5000/api/results/all', {
          
//         });
//         if (res.ok) {
//           const data = await res.json();
//           setResults(data);
//         } else {
//           console.error('Failed to fetch exam results');
//         }
//       } catch (error) {
//         console.error('Error fetching exam results:', error);
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchResults();
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <h1 className="text-3xl font-bold mb-6 text-center">Teacher Dashboard</h1>
//       {loading ? (
//         <p className="text-center">Loading results...</p>
//       ) : results.length === 0 ? (
//         <p className="text-center">No exam submissions found.</p>
//       ) : (
//         <div className="space-y-6">
//           {results.map((result) => (
//             <div
//               key={result.id}
//               className="bg-white shadow-md rounded-lg p-6"
//             >
//               <h2 className="text-2xl font-semibold mb-2">
//                 {result.student?.name || 'Unknown Student'}{' '}
//                 {result.student?.email && (
//                   <span className="text-sm text-gray-600">
//                     ({result.student.email})
//                   </span>
//                 )}
//               </h2>
//               <p className="text-gray-700 mb-2">
//                 <span className="font-semibold">Exam ID:</span> {result.examId}
//               </p>
//               <p className="text-gray-700 mb-4">
//                 <span className="font-semibold">Submitted At:</span>{' '}
//                 {result.submittedAt && result.submittedAt._seconds
//                   ? new Date(result.submittedAt._seconds * 1000).toLocaleString()
//                   : 'N/A'}
//               </p>
//               <div>
//                 <h3 className="text-xl font-bold mb-2">Answers:</h3>
//                 <ul className="list-disc ml-6 space-y-1">
//                   {result.answers &&
//                     Object.entries(result.answers).map(([questionKey, answer]) => (
//                       <li key={questionKey}>
//                         <span className="font-semibold">{questionKey}:</span> {answer}
//                       </li>
//                     ))}
//                 </ul>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }
'use client';
import { useState, useEffect } from 'react';

export default function Dashboard() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchResults() {
      try {
        const res = await fetch('http://localhost:5000/api/results/all');
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
      <h1 className="text-3xl font-bold mb-6 text-center">Teacher Dashboard</h1>
      {loading ? (
        <p className="text-center">Loading results...</p>
      ) : results.length === 0 ? (
        <p className="text-center">No exam submissions found.</p>
      ) : (
        <div className="space-y-12">
          {results.map((result) => (
            <div
              key={result.id}
              className="bg-white shadow-md rounded-lg p-6 mx-auto max-w-5xl"
            >
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
              <h3 className="text-xl font-bold mb-4">Answers:</h3>
              <div className="flex justify-end">
                <div className="flex flex-wrap gap-4">
                  {result.answers &&
                    Object.entries(result.answers).map(([questionKey, answer]) => (
                      <div
                        key={questionKey}
                        className="w-[400px] h-[400px] bg-gray-50 shadow rounded-lg p-4 flex flex-col justify-center items-center"
                      >
                        <p className="font-semibold text-center">{questionKey}</p>
                        <p className="text-center mt-2">{answer}</p>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


