# Demo School Online Exam Portal

## Overview
This project is a full-stack online examination system built for Demo School. It enables students to take real-time exams with features such as secure login, dynamic question management, countdown timers, and role-based access. Administrators can review exam submissions via a dedicated dashboard.

![Image](https://github.com/user-attachments/assets/5cf1794f-e43c-4e91-b1cc-c64b7c9624f5)

![Image](https://github.com/user-attachments/assets/8f90f7ba-a996-4215-bd99-cbff10a9da13)

## Features
- **Secure Authentication & Role Management:**  
  - Students and admins log in via secure authentication (using JWT and Firebase Authentication).
  - Role-based access ensures only authorized users can access specific dashboards.
- **Real-time Exam Functionality:**  
  - Countdown timer with auto-submit when time expires.
  - Auto-save of answers and options to mark questions for review or clear responses.
  - Dynamic question palette displays current status (answered, marked, etc.) for efficient navigation.
- **Data Management & Analytics:**  
  - Exam submissions and results are stored and retrieved efficiently using Firebase Firestore.
- **Responsive Design:**  
  - Built with Next.js and Tailwind CSS for a modern, responsive user interface.

## Technologies Used
- **Frontend:** Next.js, Tailwind CSS, React
- **Backend:** Express.js, Firebase Firestore, Firebase Authentication, JWT, bcrypt
- **Deployment:** Node.js, with environment variables configured via a `.env` file

## Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/AbhishekAnan00/demo-school-exam-system-portal.git
    ```FOR BACKEND
   cd backend
   node server.js
    ```FOR FRONTEND
   cd frontend
   npm run dev
