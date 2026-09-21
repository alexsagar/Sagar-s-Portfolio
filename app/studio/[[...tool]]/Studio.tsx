'use client';

import { NextStudio } from 'next-sanity/studio';
import config from '@/sanity.config';

export default function Studio() {
  return (
    <div
      data-lenis-prevent
      data-lenis-prevent-wheel
      data-lenis-prevent-touch
      style={{
        position: 'fixed',
        inset: 0,
        height: '100vh',
        maxHeight: '100dvh',
        width: '100vw',
      }}
    >
      <NextStudio config={{ ...config, basePath: '/studio' }} />
    </div>
  );
}
