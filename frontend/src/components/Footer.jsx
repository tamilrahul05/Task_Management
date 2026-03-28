import React from 'react';

export default function Footer() {
  return (
    <footer className="mt-auto bg-white border-t py-6 text-center text-slate-500 text-sm">
      <p>Task Management System {new Date().getFullYear()}</p>
    </footer>
  );
}
