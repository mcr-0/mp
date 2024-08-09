"use client";

import { useEffect, useState } from "react";

interface DataItem {
  offer_name: string;
  offer_id: string; // Zakładam, że to jest typ Date w formacie ISO
}

const Dashboard: React.FC = () => {
  const [prismaData, setPrismaData] = useState<DataItem[]>([]);
  const [xataData, setXataData] = useState<DataItem[]>([]);
  const [totalRecords, setTotalRecords] = useState<number>(0);

  useEffect(() => {
    async function fetchData() {
      try {
        const prismaRes = await fetch("/api/prisma-data");
        const prismaJson: DataItem[] = await prismaRes.json();
        console.log("Fetched Prisma data:", prismaJson); // Dodaj logowanie
        setPrismaData(prismaJson);

        const xataRes = await fetch("/api/xata-data");
        const xataJson: DataItem[] = await xataRes.json();
        console.log("Fetched Xata data:", xataJson); // Dodaj logowanie
        setXataData(xataJson);
        const totalRecordsCount = prismaJson.length + xataJson.length;
        setTotalRecords(totalRecordsCount);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData(); // Fetch data immediately on mount

    const intervalId = setInterval(fetchData, 5000); // Fetch data every 5 seconds

    return () => clearInterval(intervalId); // Clear interval on component unmount
  }, []);

  return (
    <div className="text-white">
      <h1>Dashboard</h1>
      <h2>Data from Prisma</h2>
      <table>
        <thead>
          <tr>
            <th>Offer Name</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {prismaData.map((item, index) => (
            <tr key={index}>
              <td>{item.offer_name}</td>
              <td>{item.offer_id}</td>
              {/* Formatowanie daty */}
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Data from Xata.io</h2>
      <table>
        <thead>
          <tr>
            <th>Offer Name</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {xataData.map((item, index) => (
            <tr key={index}>
              <td>{item.offer_name}</td>
              <td>{item.offer_id}</td>
              {/* Formatowanie daty */}
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Total Records: {totalRecords}</h2>{" "}
      {/* Wyświetlanie łącznej liczby rekordów */}
    </div>
  );
};

export default Dashboard;
