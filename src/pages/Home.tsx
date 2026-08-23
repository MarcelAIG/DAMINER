import React from 'react';
import { Hero } from '../components/Hero';
import { Featured } from '../components/Featured';
import { CustomMfg } from '../components/CustomMfg';
import { Quality } from '../components/Quality';
import { About } from '../components/About';
import { FinalCTA } from '../components/FinalCTA';
import { Stats } from '../components/Stats';

export function Home() {
  return (
    <main>
      <Hero />
      <Featured />
      <Stats />
      <CustomMfg />
      <Quality />
      <About />
      <FinalCTA />
    </main>
  );
}
