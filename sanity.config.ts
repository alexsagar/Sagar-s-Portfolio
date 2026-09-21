'use client';

import { visionTool } from '@sanity/vision';
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { apiVersion, dataset, projectId } from './sanity/env';
import { schemaTypes } from './sanity/schemas';

// Support both embedded Next.js studio (/studio) and hosted Studio on *.sanity.studio (/)
const isEmbedded =
  typeof window !== 'undefined'
    ? window.location.pathname.startsWith('/studio') &&
      !window.location.hostname.endsWith('sanity.studio')
    : false;

export default defineConfig({
  basePath: isEmbedded ? '/studio' : undefined,
  projectId: projectId || 'st3egm4a',
  dataset: dataset || 'production',
  title: "Sagar's Portfolio Studio",
  schema: {
    types: schemaTypes,
  },
  plugins: [
    structureTool(),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
