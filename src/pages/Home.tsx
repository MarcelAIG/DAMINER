import React from 'react';
import { Hero } from '../components/Hero';
import { HomeCategories } from '../components/HomeCategories';
import { Featured } from '../components/Featured';
import { CustomMfg } from '../components/CustomMfg';
import { Quality } from '../components/Quality';
import { About } from '../components/About';
import { FinalCTA } from '../components/FinalCTA';

export function Home() {
  return (
    <main>
      <Hero />
      <HomeCategories />
      <Featured />
      <CustomMfg />
      <Quality />
      <About />
      <FinalCTA />
    </main>
  );
}
