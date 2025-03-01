"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div>
      {/* Navigation Bar */}
      <nav className="flex justify-between items-center p-4 shadow-md">
        <h1 className="text-xl font-bold">TaskManager</h1>
        <div className="flex gap-4">
          <Link href="/login" className="px-4 py-2 text-primary-500 border border-primary-500 rounded">Login</Link>
          <Link href="/register" className="px-4 py-2 bg-primary-500 text-white rounded">Register</Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-3xl font-semibold">Welcome to TaskManager</h2>
        <p className="text-gray-600 mt-2">Manage your tasks efficiently with ease.</p>
      </main>
    </div>
  );
}
