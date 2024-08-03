declare global {
  function gtag_report_conversion(url?: string): boolean;
  function sa_event(eventName: string): void;
}

export {};
