"use client";
import { useEffect, useState } from "react";
import { NextApiRequest, NextApiResponse } from "next/types";

import requestIp from "request-ip";

export default async function myRoute(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const detectedIp = requestIp.getClientIp(req);

  return (
    <div>
      <h1>Your IP: {detectedIp}</h1>
    </div>
  );
}
