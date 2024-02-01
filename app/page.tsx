'use client';
import React from 'react';
import { HomeSection } from '@components/ui/Section';
import Carousel from '@components/home/Carousel';

function HomePage() {
  return (
    <HomeSection>
      <Carousel />
    </HomeSection>
  );
}

export default HomePage;
