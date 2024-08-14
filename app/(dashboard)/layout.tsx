// src/app/dashboard/layout.tsx
import React from "react";
import Link from "next/link";
import "./globals.css";

export const metadata = {
  title: "Dashboard",
  description: "Dashboard overview",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <div className="flex min-h-screen flex-col bg-gray-100">
          <header className="bg-blue-600 text-white shadow-lg">
            <div className="container mx-auto flex items-center justify-between p-4">
              <h1 className="text-2xl font-bold">Dashboard</h1>
              <nav>
                <ul className="flex space-x-4">
                  <li>
                    <Link href="/dashboard" className="hover:underline">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/dashboard/settings"
                      className="hover:underline"
                    >
                      Settings
                    </Link>
                  </li>
                  <li>
                    <Link href="/dashboard/profile" className="hover:underline">
                      Profile
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </header>
          <div className="flex flex-1">
            <aside className="w-64 bg-white p-4 shadow-lg">
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/dashboard/overview"
                    className="block rounded px-3 py-2 hover:bg-blue-100"
                  >
                    Overview
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dashboard/users"
                    className="block rounded px-3 py-2 hover:bg-blue-100"
                  >
                    Users
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dashboard/reports"
                    className="block rounded px-3 py-2 hover:bg-blue-100"
                  >
                    Reports
                  </Link>
                </li>
              </ul>
            </aside>
            <main className="flex-1 bg-gray-50 p-6">{children}</main>
          </div>
          <footer className="bg-blue-600 p-4 text-center text-white">
            <p>&copy; 2024 Ads. All rights reserved.</p>
          </footer>
        </div>
      </body>
    </html>
  );
}
