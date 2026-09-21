import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'client',
  title: 'Clients & Collaborators',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Company / Client Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle / Tagline (Optional)',
      type: 'string',
      description: 'e.g. "Pvt. Ltd.", "Learn. Build. Grow.", or "Service"',
    }),
    defineField({
      name: 'logo',
      title: 'Brand Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          description: 'Descriptive text for accessibility and SEO',
        },
      ],
    }),
    defineField({
      name: 'url',
      title: 'Website / External URL (Optional)',
      type: 'url',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first',
      initialValue: 10,
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'subtitle',
      media: 'logo',
    },
  },
});
