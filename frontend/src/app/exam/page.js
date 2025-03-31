'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

export default function ExamPage() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [statuses, setStatuses] = useState({});
  const [timeLeft, setTimeLeft] = useState(60 * 60); 
  const [student, setStudent] = useState(null);
  const questionRefs = useRef({});
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser || storedUser === 'undefined') {
      alert('Please log in to take the exam.');
      router.push('/login');
    } else {
      try {
        const user = JSON.parse(storedUser);
        setStudent(user);
      } catch (error) {
        console.error('Error parsing user info:', error);
        alert('Invalid user info. Please log in again.');
        router.push('/login');
      }
    }
  }, [router]);

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = '';
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) {
      handleSubmitExam();
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    async function fetchQuestions() {
      try {
        const res = await fetch('http://localhost:5000/api/questions/fetch', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          setQuestions(data);
          const initStatuses = {};
          data.forEach((q) => (initStatuses[q.id] = "unanswered"));
          setStatuses(initStatuses);
        } else {
          console.error('Failed to fetch questions');
        }
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    }
    fetchQuestions();
  }, []);

  const scrollToQuestion = (index) => {
    const qId = questions[index]?.id;
    const el = questionRefs.current[qId];
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleAnswerChange = (qId, option) => {
    setAnswers((prev) => ({ ...prev, [qId]: option }));
    setStatuses((prev) => ({ ...prev, [qId]: "answered" }));
  };

  const handleSaveNext = (index) => {
    const qId = questions[index].id;
    setStatuses((prev) => ({
      ...prev,
      [qId]: answers[qId] ? "answered" : "unanswered",
    }));

    if (index < questions.length - 1) {
      scrollToQuestion(index + 1);
    }
  };

  const handleMarkForReview = (index) => {
    const qId = questions[index].id;
    setStatuses((prev) => ({ ...prev, [qId]: "marked" }));
    if (index < questions.length - 1) {
      scrollToQuestion(index + 1);
    }
  };

  const handleClearResponse = (index) => {
    const qId = questions[index].id;
    setAnswers((prev) => ({ ...prev, [qId]: null }));
    setStatuses((prev) => ({ ...prev, [qId]: "unanswered" }));
  };

  const handleSubmitExam = async () => {
    if (!student) {
      alert('Student information missing. Please log in.');
      return;
    }
    const token = localStorage.getItem('token');
    try {
      const res = await fetch('http://localhost:5000/api/exam/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          examId: 'exam123',
          userId: student.id,
          student: { name: student.name, email: student.email },
          answers,
        }),
      });
      if (res.ok) {
        alert('Exam submitted successfully! Please wait for your results.');
        router.push('/');
      } else {
        alert('Exam submission failed!');
      }
    } catch (error) {
      console.error('Error submitting exam:', error);
      alert('Exam submission failed!');
    }
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const getStatusClass = (qId) => {
    const status = statuses[qId] || "unanswered";
    if (status === "answered") return "bg-green-500 text-white";
    if (status === "marked") return "bg-purple-500 text-white";
    return "bg-gray-300 text-black";
  };

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="bg-blue-900 text-white px-4 py-2 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-bold">DEMO SCHOOL</h1>
          {/* <div className="hidden md:flex space-x-2">
            <button className="bg-blue-700 px-3 py-1 rounded">PHYSICS</button>
            <button className="bg-blue-700 px-3 py-1 rounded">CHEMISTRY</button>
            <button className="bg-blue-700 px-3 py-1 rounded">MATHEMATICS</button>
          </div> */}
        </div>
        <div className="flex items-center space-x-4">
          {student ? (
            <p>
              Candidate Name: <span className="font-semibold">{student.name}</span>
            </p>
          ) : (
            <p>Loading user...</p>
          )}
          <p>Subject Name: <span className="font-semibold">English</span></p>
          <p>
            Time Left: <span className="font-semibold">{formatTime(timeLeft)}</span>
          </p>
        </div>
      </nav>

      <div className="bg-gray-200 px-4 py-2 flex justify-between items-center">
        <div>
        <a
      href="/exam-paper.pdf" // Place your paper file in the public folder
      download
      className="bg-orange-500 text-white px-3 py-1 rounded mr-2 inline-block hover:bg-orange-400 cursor:pointer"
    >
      DOWNLOAD PAPER IN
    </a>
          <select className="px-2 py-1 border rounded">
            <option>English</option>
            <option>Hindi</option>
          </select>
        </div>
        <div className="text-gray-700">
          <span className="font-bold">Paper Language:</span> English
        </div>
      </div>

      <div className="flex flex-1">
        <div className="flex-1 p-4 overflow-y-auto bg-white">
          {questions.length === 0 ? (
            <p>Loading questions...</p>
          ) : (
            questions.map((q, index) => (
              <div
                key={q.id}
                ref={(el) => (questionRefs.current[q.id] = el)}
                className="mb-6 p-4 border rounded shadow"
              >
                <p className="text-lg font-semibold mb-2">
                  Question {index + 1}: {q.question}
                </p>
                {q.options.map((option, idx) => (
                  <div key={idx} className="mb-2">
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name={`question-${q.id}`}
                        value={option}
                        checked={answers[q.id] === option}
                        onChange={() => handleAnswerChange(q.id, option)}
                      />
                      <span>{option}</span>
                    </label>
                  </div>
                ))}
                <div className="mt-4 space-x-2">
                  <button
                    onClick={() => handleMarkForReview(index)}
                    className="bg-purple-500 text-white px-3 py-1 rounded"
                  >
                    Mark for Review & Next
                  </button>
                  <button
                    onClick={() => handleClearResponse(index)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Clear Response
                  </button>
                  <button
                    onClick={() => handleSaveNext(index)}
                    className="bg-green-600 text-white px-3 py-1 rounded"
                  >
                    Save & Next
                  </button>
                </div>
              </div>
            ))
          )}
          <button
            onClick={handleSubmitExam}
            className="bg-green-700 text-white px-4 py-2 rounded mt-4 cursor-pointer"
          >
            Submit Exam
          </button>
        </div>

        <div className="w-64 bg-gray-100 p-4 border-l overflow-y-auto">
          <h3 className="text-lg font-bold mb-2">Question Palette</h3>
          <div className="grid grid-cols-5 gap-2 mb-4">
            {questions.map((q, index) => (
              <button
                key={q.id}
                onClick={() => scrollToQuestion(index)}
                className={`p-2 rounded w-[40px] h-[40px] ${getStatusClass(q.id)}`}
              >
                {index + 1}
              </button>
            ))}
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-green-500 rounded" />
              <span>Answered</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-gray-300 rounded" />
              <span>Not Visited</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-red-500 rounded" />
              <span>Not Answered</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-purple-500 rounded" />
              <span>Marked for Review</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


