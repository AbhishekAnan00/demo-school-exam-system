import "./globals.css";


export const metadata = {
  title: "Demo-School-Exam-System",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
      >
       <main>{children}</main>
      </body>
    </html>
  );
}
