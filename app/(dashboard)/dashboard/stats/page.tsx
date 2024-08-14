"use client";

import { useEffect, useState } from "react";

export default function Dashboard() {
  const [data, setData] = useState<{
    today: { count: number; payout: number; payoutPerUser: number };
    yesterday: { count: number; payout: number; payoutPerUser: number };
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/load-data");
        const result = await res.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>No data available</div>;
  }

  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl font-bold">Dashboard</h1>
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Today</h2>
        <p>New users: {data.today.count}</p>
        <p>Total payout: ${data.today.payout.toFixed(2)}</p>
        <p>EPNU: ${data.today.payoutPerUser.toFixed(2)}</p>
      </div>
      <div>
        <h2 className="text-xl font-semibold">Yesterday</h2>
        <p>New users: {data.yesterday.count}</p>
        <p>Total payout: ${data.yesterday.payout.toFixed(2)}</p>
        <p>EPNU: ${data.yesterday.payoutPerUser.toFixed(2)}</p>
      </div>
    </div>
  );
}
