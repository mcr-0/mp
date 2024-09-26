// GoogleAnalytics.tsx

import React from "react";
import Script from "next/script";

const GoogleAds = () => {
  return (
    <>
      <Script
        strategy="lazyOnload"
        id=""
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_MEASUREMENT_ID}`}
      />

      <Script id="" strategy="lazyOnload">
        {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
              });
          `}
      </Script>

      <Script id="" strategy="lazyOnload">
        {`
          function gtag_report_conversion(url) {
            var callback = function () {
              if (typeof(url) != 'undefined') {
                window.location = url;
              }
            };
            gtag('event', 'conversion', {
              'send_to': '${process.env.NEXT_PUBLIC_MEASUREMENT_ID}/rIvCCKjns9YZELvW4KE-',
              'value': 0.1,
              'currency': 'EUR',
              'event_callback': callback
            });
            return false;
          }
        `}
      </Script>
    </>
  );
};

export default GoogleAds;
