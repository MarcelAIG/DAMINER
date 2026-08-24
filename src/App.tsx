/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { RequestProvider } from './context/RequestContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { RequestDrawer } from './components/RequestDrawer';
import { Home } from './pages/Home';
import { Solutions } from './pages/Solutions';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Catalog } from './pages/Catalog';
import { Product } from './pages/Product';
import { Privacy } from './pages/Privacy';
import { Terms } from './pages/Terms';
import { Returns } from './pages/Returns';
import { Certificates } from './pages/Certificates';
import { Payment } from './pages/Payment';
import { Warranty } from './pages/Warranty';

export default function App() {
  return (
    <LanguageProvider>
      <RequestProvider>
        <Router>
          <div className="min-h-screen bg-off-white flex flex-col relative">
            <Navbar />
            <div className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/catalog" element={<Catalog />} />
                <Route path="/catalog/:categoryId" element={<Catalog />} />
                <Route path="/product/:id" element={<Product />} />
                <Route path="/solutions" element={<Solutions />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/certificates" element={<Certificates />} />
                <Route path="/payment" element={<Payment />} />
                <Route path="/warranty" element={<Warranty />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/returns" element={<Returns />} />
              </Routes>
            </div>
            <Footer />
            <RequestDrawer />
          </div>
        </Router>
      </RequestProvider>
    </LanguageProvider>
  );
}
