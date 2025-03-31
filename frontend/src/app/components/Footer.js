'use client';

export default function Footer() {
  return (
    <footer>
      <div className="text-center text-sm text-gray-400 mt-8 border-t border-gray-700 pt-4 bg-gray-900 ">
        © {new Date().getFullYear()} Demo School. All rights reserved.
      </div>
    </footer>
  );
}
