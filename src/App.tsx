/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Categories } from './components/Categories';
import { Featured } from './components/Featured';
import { CustomMfg } from './components/CustomMfg';
import { Quality } from './components/Quality';
import { About } from './components/About';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-off-white">
        <Navbar />
        <main>
          <Hero />
          <Categories />
          <Featured />
          <CustomMfg />
          <Quality />
          <About />
          <FinalCTA />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}
