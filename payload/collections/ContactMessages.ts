import type { CollectionConfig } from "payload";

export const ContactMessages: CollectionConfig = {
  slug: "contact-messages",
  admin: {
    useAsTitle: "subject",
  },
  access: {
    create: () => true, // Allow public API to post contact submissions
    read: ({ req }) => Boolean(req.user), // Restrict reading to authenticated admins
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "email",
      type: "email",
      required: true,
    },
    {
      name: "subject",
      type: "text",
      required: true,
    },
    {
      name: "message",
      type: "textarea",
      required: true,
    },
    {
      name: "read",
      type: "checkbox",
      defaultValue: false,
    },
  ],
};
