"use client";
import Script from "next/script";

const AOSInitializer = () => {
  return (
    <Script
      src="https://unpkg.com/aos@next/dist/aos.js"
      strategy="afterInteractive"
      onLoad={() => {
        if (typeof window !== 'undefined' && window.AOS) {
          window.AOS.init();
        }
      }}
    />
  );
};

export default AOSInitializer;