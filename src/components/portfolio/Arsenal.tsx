// src/components/portfolio/Arsenal.tsx
'use client';
import React from 'react';
import FlowingMenu from './FlowingMenu';
import SectionWrapper from './SectionWrapper';
import SectionHeader from './SectionHeader';

// The data for your skills, which will be passed to the FlowingMenu
const arsenalItems = [
  {
    link: '#',
    text: 'Core Languages & Foundations',
    logos: [
      '/logos/python.svg',
      '/logos/assembly.svg',
      '/logos/c.svg',
      '/logos/js.svg',
    ],
  },
  {
    link: '#',
    text: 'Frontend Development',
    logos: ['/logos/react.svg', '/logos/vite.svg', '/logos/next.svg'],
  },
  {
    link: '#',
    text: 'Backend/Desktop Development',
    logos: ['/logos/node.svg', '/logos/express.svg', '/logos/electron.svg', '/logos/flutter.svg'],
  },
  {
    link: '#',
    text: 'Databases',
    logos: ['/logos/mongodb.svg', '/logos/postgres.svg', '/logos/sql.svg'],
  },
  {
    link: '#',
    text: 'Specialized/Emerging Fields',
    logos: ['/logos/pytorch.svg', '/logos/tf.svg', '/logos/web3.svg'],
  },
];

export default function Arsenal() {
  return (
    <SectionWrapper>
      <SectionHeader title="My Arsenal" shapeType="triangle" />

      <div className="absolute inset-0 pt-24 pb-24">
        <FlowingMenu items={arsenalItems} />
      </div>

    </SectionWrapper>
  );
}