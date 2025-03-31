'use client';

import Link from 'next/link';

export default function Navbar() {
  return (
    <nav
      style={{
        padding: '10px 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
      className='bg-yellow-500'
    >
      <Link href="/" style={{ color: '#fff', fontSize: '18px', fontWeight: 'bold' }}>
        Demo School
      </Link>
      <Link href="/admin/login" style={{ color: '#fff', fontSize: '16px' }}>
        Admin
      </Link>
    </nav>
  );
}
