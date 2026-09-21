import groq from 'groq';

export const clientsQuery = groq`
  *[_type == "client"] | order(order asc, _createdAt asc) {
    _id,
    name,
    subtitle,
    url,
    order,
    logo {
      asset-> {
        _id,
        url
      },
      alt
    }
  }
`;

export const projectsQuery = groq`
  *[_type == "project"] | order(order asc, _createdAt asc) {
    _id,
    title,
    "slug": slug.current,
    description,
    category,
    link,
    githubLink,
    tags,
    featured,
    order,
    image {
      asset-> {
        _id,
        url
      },
      alt
    }
  }
`;

export const testimonialsQuery = groq`
  *[_type == "testimonial"] | order(order asc, _createdAt asc) {
    _id,
    name,
    title,
    quote,
    order,
    avatar {
      asset-> {
        _id,
        url
      },
      alt
    }
  }
`;

export const postsQuery = groq`
  *[_type == "post"] | order(publishedAt desc, _createdAt desc) {
    _id,
    title,
    "slug": slug.current,
    category,
    excerpt,
    publishedAt,
    readTime,
    tags,
    featured,
    mainImage {
      asset-> {
        _id,
        url
      },
      alt
    }
  }
`;

export const featuredPostsQuery = groq`
  *[_type == "post" && (featured == true || !defined(featured))] | order(publishedAt desc, _createdAt desc)[0...3] {
    _id,
    title,
    "slug": slug.current,
    category,
    excerpt,
    publishedAt,
    readTime,
    tags,
    featured,
    mainImage {
      asset-> {
        _id,
        url
      },
      alt
    }
  }
`;

export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    category,
    excerpt,
    publishedAt,
    readTime,
    tags,
    body,
    mainImage {
      asset-> {
        _id,
        url
      },
      alt
    }
  }
`;

export const postSlugsQuery = groq`
  *[_type == "post" && defined(slug.current)][].slug.current
`;
