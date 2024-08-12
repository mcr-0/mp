declare global {
  function gtag_report_conversion(url?: string): boolean;
  function sa_event(eventName: string): void;
}

export {};

import { NextApiRequest } from "next";

declare module "next" {
  interface NextApiRequest {
    clientIp?: string;
  }
}

declare const plugin: { handler: () => void };

export = plugin;
