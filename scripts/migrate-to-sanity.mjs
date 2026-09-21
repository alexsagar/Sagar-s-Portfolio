/**
 * Sanity CMS Migration Script
 * 
 * Migrates all existing projects, clients, and testimonials (including their images)
 * directly into your Sanity dataset.
 * 
 * Usage:
 *   node scripts/migrate-to-sanity.mjs
 * 
 * Ensure the following environment variables are set in your .env.local or shell:
 *   NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
 *   NEXT_PUBLIC_SANITY_DATASET=production (default)
 *   SANITY_API_TOKEN=your_sanity_write_token
 */

import fs from 'fs';
import path from 'path';
import { createClient } from '@sanity/client';

// Load .env.local if present
const envLocalPath = path.join(process.cwd(), '.env.local');
if (fs.existsSync(envLocalPath)) {
  const envContent = fs.readFileSync(envLocalPath, 'utf8');
  for (const line of envContent.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eqIdx = trimmed.indexOf('=');
    if (eqIdx > 0) {
      const key = trimmed.slice(0, eqIdx).trim();
      const val = trimmed.slice(eqIdx + 1).trim().replace(/^["']|["']$/g, '');
      if (!process.env[key]) process.env[key] = val;
    }
  }
}

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const token = process.env.SANITY_API_TOKEN || process.env.SANITY_AUTH_TOKEN;

console.log('--- Sanity CMS Content & Image Migration ---');

if (!projectId || !token) {
  console.error('\n❌ Missing Sanity credentials:');
  if (!projectId) console.error('   • NEXT_PUBLIC_SANITY_PROJECT_ID is not set in .env.local');
  if (!token) console.error('   • SANITY_API_TOKEN (with Write permissions) is not set in .env.local');
  console.log('\n📖 How to get your credentials:');
  console.log('   1. Visit https://www.sanity.io/manage');
  console.log('   2. Select or create your project.');
  console.log('   3. Copy your Project ID into .env.local as NEXT_PUBLIC_SANITY_PROJECT_ID=...');
  console.log('   4. Go to API -> Tokens -> Add API token -> select "Editor" or "Admin" role.');
  console.log('   5. Add the token to .env.local as SANITY_API_TOKEN=...');
  console.log('   6. Run this script again: node scripts/migrate-to-sanity.mjs\n');

  // Generate backup json file so data is always ready
  const backupPath = path.join(process.cwd(), 'data', 'sanity-migration-export.json');
  fs.writeFileSync(backupPath, JSON.stringify({
    projects: [
      {
        title: "CinemaGhar",
        slug: "cinemaghar",
        description: "Movie discovery and details app with a clean, responsive UI.",
        category: "Website design & development",
        imagePath: "public/projects/cinemaghar.webp",
        link: "https://github.com/alexsagar/CinemaGhar",
        tags: ["React", "Tailwind CSS", "TypeScript"],
        order: 1
      },
      {
        title: "GamePasal",
        slug: "gamepasal",
        description: "Gaming storefront demo with product listings and modern UI.",
        category: "Website design & development",
        imagePath: "public/projects/gamepasal.webp",
        link: "https://github.com/alexsagar/GamePasal",
        tags: ["React", "Tailwind CSS", "TypeScript"],
        order: 2
      },
      {
        title: "Tea-N-Tea Management System",
        slug: "tea-n-tea-management-system",
        description: "Management dashboard for operations and record keeping.",
        category: "Website design & development",
        imagePath: "public/projects/teantea.webp",
        link: "https://github.com/alexsagar/Tea-N-Tea-Management-System",
        tags: ["React", "Tailwind CSS", "TypeScript"],
        order: 3
      },
      {
        title: "Full Stack Voting App",
        slug: "full-stack-voting-app",
        description: "End-to-end voting application with secure flows.",
        category: "Website design & development",
        imagePath: "public/projects/votingapp.webp",
        link: "https://github.com/alexsagar/fullstack-voting-app",
        tags: ["React", "Tailwind CSS", "TypeScript"],
        order: 4
      },
      {
        title: "Nike Ecommerce Website",
        slug: "nike-ecommerce-website",
        description: "Ecommerce UI inspired by Nike—product cards and smooth layout.",
        category: "Website design & development",
        imagePath: "public/projects/nike.webp",
        link: "https://github.com/alexsagar/Nike-Ecommerce-Website",
        tags: ["React", "Tailwind CSS", "TypeScript"],
        order: 5
      }
    ],
    clients: [
      { name: "DA Investment Pvt. Ltd.", subtitle: "Pvt. Ltd.", logoPath: "public/clients/da-investment-clean.png", order: 1 },
      { name: "DD Security Service", subtitle: "Service", logoPath: "public/clients/dd-security-clean.png", order: 2 },
      { name: "Seven Seas Intercontinental", subtitle: "Intercontinental", logoPath: "public/clients/seven-seas-clean.png", order: 3 },
      { name: "ITTI", subtitle: "", logoPath: "public/clients/itti-dark.svg", order: 4 },
      { name: "HypeAD", subtitle: "Marketing Agency", order: 5 },
      { name: "Mindrisers", subtitle: "Learn. Build. Grow.", order: 6 },
      { name: "DUO Nepal", subtitle: "", order: 7 },
      { name: "Babylon National School", subtitle: "", order: 8 },
      { name: "Streamstop", subtitle: "", order: 9 }
    ],
    testimonials: [
      {
        name: "Saugat Ojha",
        title: "HypeAD Marketing Agency",
        quote: "Working with Sagar was a great experience from start to finish. He quickly understood our requirements and translated them into clean, scalable features with thoughtful UX. Communication was consistent and proactive, and he handled feedback with a professional, solutions‑oriented mindset. The final deliverables were stable, performant, and easy for our team to maintain.",
        order: 1
      },
      {
        name: "Mindrisers Institute",
        title: "Training & Collaboration Partner",
        quote: "Sagar demonstrated strong problem‑solving skills and genuine ownership over his work. He iterated quickly, improved UI/UX details without being asked, and backed decisions with clear reasoning. His collaborative approach and attention to edge cases significantly improved our timelines and overall quality of the product experience.",
        order: 2
      },
      {
        name: "Bipasana Karki",
        title: "Duo Nepal",
        quote: "Professional, reliable, and creative—Sagar elevated our digital presence beyond expectations. He produced high‑quality visuals and copy, aligned them with brand goals, and ensured smooth hand‑off and implementation. We appreciated his calm under pressure, clear documentation, and commitment to delivering measurable results.",
        order: 3
      }
    ]
  }, null, 2));
  console.log(`📦 Prepared data snapshot saved to: ${backupPath}`);
  process.exit(0);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  useCdn: false,
  token,
});

async function uploadImage(filePath, title = '') {
  const fullPath = path.isAbsolute(filePath) ? filePath : path.join(process.cwd(), filePath);
  if (!fs.existsSync(fullPath)) {
    console.warn(`   ⚠️ File not found: ${fullPath}`);
    return null;
  }
  const stream = fs.createReadStream(fullPath);
  const filename = path.basename(fullPath);
  console.log(`   ⬆️ Uploading image asset: ${filename}...`);
  const asset = await client.assets.upload('image', stream, {
    filename,
    title: title || filename,
  });
  return asset;
}

async function migrate() {
  console.log(`\nConnecting to Sanity project: ${projectId} (dataset: ${dataset})...\n`);

  // 1. Migrate Projects
  console.log('--- 1. Migrating Projects & Screenshots ---');
  const projectsData = [
    {
      id: 'project-cinemaghar',
      title: "CinemaGhar",
      slug: "cinemaghar",
      description: "Movie discovery and details app with a clean, responsive UI.",
      category: "Website design & development",
      imagePath: "public/projects/cinemaghar.webp",
      link: "https://github.com/alexsagar/CinemaGhar",
      tags: ["React", "Tailwind CSS", "TypeScript"],
      order: 1
    },
    {
      id: 'project-gamepasal',
      title: "GamePasal",
      slug: "gamepasal",
      description: "Gaming storefront demo with product listings and modern UI.",
      category: "Website design & development",
      imagePath: "public/projects/gamepasal.webp",
      link: "https://github.com/alexsagar/GamePasal",
      tags: ["React", "Tailwind CSS", "TypeScript"],
      order: 2
    },
    {
      id: 'project-teantea',
      title: "Tea-N-Tea Management System",
      slug: "tea-n-tea-management-system",
      description: "Management dashboard for operations and record keeping.",
      category: "Website design & development",
      imagePath: "public/projects/teantea.webp",
      link: "https://github.com/alexsagar/Tea-N-Tea-Management-System",
      tags: ["React", "Tailwind CSS", "TypeScript"],
      order: 3
    },
    {
      id: 'project-votingapp',
      title: "Full Stack Voting App",
      slug: "full-stack-voting-app",
      description: "End-to-end voting application with secure flows.",
      category: "Website design & development",
      imagePath: "public/projects/votingapp.webp",
      link: "https://github.com/alexsagar/fullstack-voting-app",
      tags: ["React", "Tailwind CSS", "TypeScript"],
      order: 4
    },
    {
      id: 'project-nike',
      title: "Nike Ecommerce Website",
      slug: "nike-ecommerce-website",
      description: "Ecommerce UI inspired by Nike—product cards and smooth layout.",
      category: "Website design & development",
      imagePath: "public/projects/nike.webp",
      link: "https://github.com/alexsagar/Nike-Ecommerce-Website",
      tags: ["React", "Tailwind CSS", "TypeScript"],
      order: 5
    }
  ];

  for (const item of projectsData) {
    let imageField = null;
    if (item.imagePath) {
      const asset = await uploadImage(item.imagePath, item.title);
      if (asset) {
        imageField = {
          _type: 'image',
          asset: { _type: 'reference', _ref: asset._id },
          alt: `${item.title} website preview`,
        };
      }
    }

    const doc = {
      _id: item.id,
      _type: 'project',
      title: item.title,
      slug: { _type: 'slug', current: item.slug },
      description: item.description,
      category: item.category,
      link: item.link,
      tags: item.tags,
      featured: true,
      order: item.order,
      ...(imageField ? { image: imageField } : {}),
    };

    await client.createOrReplace(doc);
    console.log(`   ✅ Project created/updated: ${item.title}`);
  }

  // 2. Migrate Clients
  console.log('\n--- 2. Migrating Clients & Brand Logos ---');
  const clientsData = [
    { id: 'client-da-investment', name: "DA Investment", subtitle: "PVT. LTD.", logoPath: "public/clients/da-investment-clean.png", order: 1 },
    { id: 'client-dd-security', name: "DD Security", subtitle: "SERVICE", logoPath: "public/clients/dd-security-clean.png", order: 2 },
    { id: 'client-seven-seas', name: "Seven Seas", subtitle: "INTERCONTINENTAL", logoPath: "public/clients/seven-seas-clean.png", order: 3 },
    { id: 'client-itti', name: "ITTI", subtitle: "", logoPath: "public/clients/itti-dark.svg", order: 4 },
    { id: 'client-hypead', name: "HypeAD", subtitle: "Marketing Agency", order: 5 },
    { id: 'client-mindrisers', name: "Mindrisers", subtitle: "Learn. Build. Grow.", order: 6 },
    { id: 'client-duo', name: "DUO Nepal", subtitle: "", order: 7 },
    { id: 'client-babylon', name: "Babylon National School", subtitle: "", order: 8 },
    { id: 'client-streamstop', name: "Streamstop", subtitle: "", order: 9 }
  ];

  for (const clientItem of clientsData) {
    let logoField = null;
    if (clientItem.logoPath) {
      const asset = await uploadImage(clientItem.logoPath, clientItem.name);
      if (asset) {
        logoField = {
          _type: 'image',
          asset: { _type: 'reference', _ref: asset._id },
          alt: clientItem.name,
        };
      }
    }

    const doc = {
      _id: clientItem.id,
      _type: 'client',
      name: clientItem.name,
      subtitle: clientItem.subtitle,
      order: clientItem.order,
      ...(logoField ? { logo: logoField } : {}),
    };

    await client.createOrReplace(doc);
    console.log(`   ✅ Client created/updated: ${clientItem.name}`);
  }

  // 3. Migrate Testimonials
  console.log('\n--- 3. Migrating Testimonials ---');
  const testimonialsData = [
    {
      id: 'testimonial-1',
      name: "Saugat Ojha",
      title: "HypeAD Marketing Agency",
      quote: "Working with Sagar was a great experience from start to finish. He quickly understood our requirements and translated them into clean, scalable features with thoughtful UX. Communication was consistent and proactive, and he handled feedback with a professional, solutions‑oriented mindset. The final deliverables were stable, performant, and easy for our team to maintain.",
      order: 1
    },
    {
      id: 'testimonial-2',
      name: "Mindrisers Institute",
      title: "Training & Collaboration Partner",
      quote: "Sagar demonstrated strong problem‑solving skills and genuine ownership over his work. He iterated quickly, improved UI/UX details without being asked, and backed decisions with clear reasoning. His collaborative approach and attention to edge cases significantly improved our timelines and overall quality of the product experience.",
      order: 2
    },
    {
      id: 'testimonial-3',
      name: "Bipasana Karki",
      title: "Duo Nepal",
      quote: "Professional, reliable, and creative—Sagar elevated our digital presence beyond expectations. He produced high‑quality visuals and copy, aligned them with brand goals, and ensured smooth hand‑off and implementation. We appreciated his calm under pressure, clear documentation, and commitment to delivering measurable results.",
      order: 3
    }
  ];

  for (const t of testimonialsData) {
    const doc = {
      _id: t.id,
      _type: 'testimonial',
      name: t.name,
      title: t.title,
      quote: t.quote,
      order: t.order,
    };
    await client.createOrReplace(doc);
    console.log(`   ✅ Testimonial created/updated: ${t.name}`);
  }

  // 4. Migrate Blog Posts
  console.log('\n--- 4. Migrating Blog Posts & Guides ---');
  const blogPostsData = [
    {
      id: 'post-website-development-digital-marketing-nepal',
      title: "The 2026 Guide to Modern Website Development & Digital Marketing in Nepal",
      slug: "website-development-digital-marketing-nepal",
      category: "Website Development",
      excerpt: "Why modern businesses in Kathmandu need lightning-fast, conversion-focused websites paired with strategic multi-channel digital marketing.",
      publishedAt: "2026-09-15T09:00:00Z",
      readTime: "6 min read",
      tags: ["Website Development", "Digital Marketing", "Next.js", "SEO Nepal"],
      featured: true,
      imagePath: "public/projects/cinemaghar.webp",
      paragraphs: [
        "In Nepal’s rapidly evolving digital economy, simply having a generic social media page or an outdated static website is no longer enough to win customer trust and capture high-value leads.",
        "Modern website development demands high-performance tech stacks like Next.js, React, and Tailwind CSS that achieve sub-second page loads, mobile responsiveness, and zero cumulative layout shift. When search engines like Google evaluate your site, user experience (Core Web Vitals) directly impacts whether you appear on page 1 or page 5.",
        "Pairing modern development with data-backed digital marketing—including meta performance ads, Google Ads, local SEO, and content storytelling—creates an organic flywheel that converts casual visitors into loyal paying clients.",
        "Whether you run an agency, an ecommerce brand, or an enterprise in Kathmandu, investing in clean software architecture and strategic visibility gives you an unfair competitive moat."
      ]
    },
    {
      id: 'post-local-seo-search-visibility-kathmandu',
      title: "How Local SEO & Search Visibility Scale Businesses in Kathmandu",
      slug: "local-seo-search-visibility-kathmandu",
      category: "SEO Strategy",
      excerpt: "Actionable local SEO strategies to dominate Google search results, capture high-intent local queries, and outrank competitors in Nepal.",
      publishedAt: "2026-09-02T11:30:00Z",
      readTime: "5 min read",
      tags: ["SEO Specialist", "Local SEO", "Google Search", "Kathmandu Business"],
      featured: true,
      imagePath: "public/projects/teantea.webp",
      paragraphs: [
        "Search Engine Optimization (SEO) in Nepal has graduated from keyword stuffing to semantic relevance, structured entity data, and authority building.",
        "For companies operating in Kathmandu, optimizing for local search intent means establishing clear Google Business Profile signals, Schema.org LocalBusiness markup, high-speed mobile architecture, and consistent NAP (Name, Address, Phone) citations across local directories.",
        "By answering the specific questions your prospective clients are typing into Google, your website becomes an automated, 24/7 lead generation engine that compounds in value over time.",
        "Focus on genuine topical depth, transparent case studies, and fast user journeys to convert search visitors into long-term commercial relationships."
      ]
    },
    {
      id: 'post-video-editing-performance-marketing-roi',
      title: "Maximizing ROI with Video Editing and Performance Marketing",
      slug: "video-editing-performance-marketing-roi",
      category: "Digital Marketing",
      excerpt: "How compelling video storytelling and creative post-production elevate paid social media advertising campaigns into high-converting revenue drivers.",
      publishedAt: "2026-08-20T14:15:00Z",
      readTime: "4 min read",
      tags: ["Video Editing", "Performance Marketing", "Social Media Ads", "Meta Ads"],
      featured: true,
      imagePath: "public/projects/gamepasal.webp",
      paragraphs: [
        "Attention is the new currency. In today’s crowded social feeds across TikTok, Instagram Reels, and YouTube, the first 3 seconds of a video determine whether an ad generates a click or gets scrolled past.",
        "Combining professional post-production (using tools like Adobe Premiere and After Effects) with rigorous performance marketing metrics allows you to test creative hooks, retention rates, and click-through rates systematically.",
        "Great editing isn't just about flashy visual effects—it’s about clarity, pacing, and guiding the viewer directly toward a clear call-to-action.",
        "When creative production aligns seamlessly with target audience analytics, return on ad spend (ROAS) skyrockets while customer acquisition costs drop."
      ]
    }
  ];

  for (const post of blogPostsData) {
    let mainImageField = null;
    if (post.imagePath) {
      const asset = await uploadImage(post.imagePath, post.title);
      if (asset) {
        mainImageField = {
          _type: 'image',
          asset: { _type: 'reference', _ref: asset._id },
          alt: post.title,
        };
      }
    }

    const bodyBlocks = post.paragraphs.map((p, idx) => ({
      _type: 'block',
      _key: `p-${idx}`,
      style: 'normal',
      markDefs: [],
      children: [
        {
          _type: 'span',
          _key: `s-${idx}`,
          text: p,
          marks: [],
        },
      ],
    }));

    const doc = {
      _id: post.id,
      _type: 'post',
      title: post.title,
      slug: { _type: 'slug', current: post.slug },
      category: post.category,
      excerpt: post.excerpt,
      publishedAt: post.publishedAt,
      readTime: post.readTime,
      tags: post.tags,
      featured: post.featured,
      body: bodyBlocks,
      ...(mainImageField ? { mainImage: mainImageField } : {}),
    };

    await client.createOrReplace(doc);
    console.log(`   ✅ Blog post created/updated: ${post.title}`);
  }

  console.log('\n🎉 Migration complete! All clients, projects, testimonials, blog posts, and images are live in Sanity!');
}

migrate().catch((err) => {
  console.error('\n❌ Migration error:', err);
  process.exit(1);
});
