'use client';

import React, { useState } from 'react';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DispatchModal from '@/components/DispatchModal';
import { Analytics } from '@vercel/analytics/next';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <title>SWIFTWAY LOGISTICS | High-RPM Freight Dispatching for Owner-Operators & Fleets</title>
        <meta 
          name="description" 
          content="Premier 24/7 truck dispatching service for owner-operators and small fleets. Maximizing Rate Per Mile (RPM), eliminating deadhead miles, FMCSA compliant broker vetting, and rate con negotiations." 
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#0F172A] antialiased selection:bg-amber-500 selection:text-white">
        <Navbar onOpenModal={() => setIsModalOpen(true)} />
        
        <main className="flex-grow">
          {children}
        </main>

        <Footer />

        <DispatchModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
        />
        <Analytics />
      </body>
    </html>
  );
}
