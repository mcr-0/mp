"use client";
import { useEffect, useState } from "react";

function useUserIP() {
  const [ip, setIP] = useState<string | null>(null);

  useEffect(() => {
    const fetchIP = async () => {
      try {
        const res = await fetch("https://api.ipify.org?format=json");
        const data = await res.json();
        setIP(data.ip);
      } catch (error) {
        console.error("Error fetching IP:", error);
      }
    };

    fetchIP();
  }, []);

  return ip;
}

export default function Home() {
  const ip = useUserIP();

  return (
    <div>
      <h1>Your IP: {ip}</h1>
    </div>
  );
}
