'use client';

import React, { useState } from 'react';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DispatchModal from '@/components/DispatchModal';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <html lang="en" className="scroll-smooth overflow-x-hidden">
      <head>
        <title>OTR DISPATCH | High-RPM Independent Freight Dispatch Service</title>
        <meta 
          name="description" 
          content="Premier 24/7 independent truck dispatching service for owner-operators and small fleets. Maximizing Rate Per Mile (RPM), eliminating deadhead miles, FMCSA compliant broker vetting, and rate con negotiations." 
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://otrdispach.us" />
        <meta property="og:site_name" content="OTR Dispatch" />
        <meta property="og:title" content="OTR DISPATCH | High-RPM Independent Freight Dispatch Service" />
        <meta property="og:description" content="Dedicated truck dispatching service for owner-operators and fleet owners across all 48 lower states. No forced dispatch, top RPM rates." />
        <meta property="og:url" content="https://otrdispach.us" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="OTR DISPATCH | High-RPM Independent Freight Dispatch Service" />
        <meta name="twitter:description" content="Dedicated freight dispatching service for owner-operators and fleets across all 48 states." />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#0F172A] antialiased selection:bg-amber-500 selection:text-white overflow-x-hidden w-full max-w-full">
        <Navbar onOpenModal={() => setIsModalOpen(true)} />
        
        <main className="flex-grow w-full max-w-full overflow-x-hidden">
          {children}
        </main>

        <Footer />

        <DispatchModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
        />
      </body>
    </html>
  );
}
