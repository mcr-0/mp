// page.tsx

import { headers } from "next/headers";

export default function Home() {
  const header = headers();
  const ip = (header.get("x-forwarded-for") ?? "127.0.0.1").split(",")[0];
  // ...

  return <body>{ip}</body>;
}
