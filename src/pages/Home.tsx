import React from 'react';
import { Hero } from '../components/Hero';
import { Categories } from '../components/Categories';
import { CustomMfg } from '../components/CustomMfg';
import { Quality } from '../components/Quality';
import { About } from '../components/About';
import { FAQ } from '../components/FAQ';
import { FinalCTA } from '../components/FinalCTA';
import { Stats } from '../components/Stats';
import { WhatWeDo } from '../components/WhatWeDo';

export function Home() {
  return (
    <main>
      <Hero />
      <Categories />
      <About />
      <Quality />
      <CustomMfg />
      <Stats />
      <WhatWeDo />
      <FAQ />
      <FinalCTA />
    </main>
  );
}
