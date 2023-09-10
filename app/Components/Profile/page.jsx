"use client";
import Link from "next/link";
import React, { useState } from "react";

export default function Profile() {
  const [userName, setUserName] = useState<any>("");

  React.useEffect(() => {
    const userName = localStorage.getItem("user_name");
    setUserName(userName);
  }, []);
  return (
    <div className="bg-slate-100 min-h-screen">
      <header className="bg-black text-white flex justify-between p-2">
        <h2 className="text-2xl">Personal Blog Website</h2>
        <nav>
          <ul className="flex space-x-2 text-lg">
            <Link
              href="/Components/Dashboard"
              className="text-decoration-none text-white"
            >
              Dashboard
            </Link>
            <Link href="/" style={{ textDecoration: "none", color: "white" }}>
              <li>Logout</li>
            </Link>
          </ul>
        </nav>
      </header>
      <div className="h-20 bg-slate-100 text-dark text-3xl font-semibold ps-5 flex items-center">
        <h1>Profile</h1>
      </div>
    </div>
  );
}
