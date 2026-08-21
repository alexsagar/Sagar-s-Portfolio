import type { CollectionConfig } from "payload";

export const Projects: CollectionConfig = {
  slug: "projects",
  admin: {
    useAsTitle: "title",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
    },
    {
      name: "githubRepoName",
      type: "text",
      admin: {
        description: "Exact GitHub repository name (e.g. SajiloKhata)",
      },
    },
    {
      name: "shortDescription",
      type: "textarea",
      required: true,
    },
    {
      name: "overview",
      type: "textarea",
    },
    {
      name: "featured",
      type: "checkbox",
      defaultValue: false,
    },
    {
      name: "category",
      type: "select",
      options: [
        { label: "Full Stack", value: "full-stack" },
        { label: "Frontend UI", value: "frontend" },
        { label: "Backend API", value: "backend" },
        { label: "CLI / Tooling", value: "tooling" },
      ],
      defaultValue: "full-stack",
    },
    {
      name: "projectStatus",
      type: "select",
      options: [
        { label: "Production", value: "production" },
        { label: "In Development", value: "in-development" },
        { label: "Archived", value: "archived" },
      ],
      defaultValue: "production",
    },
    {
      name: "customTags",
      type: "array",
      fields: [
        {
          name: "tag",
          type: "text",
        },
      ],
    },
    {
      name: "role",
      type: "text",
      defaultValue: "Lead Developer",
    },
    {
      name: "year",
      type: "text",
      defaultValue: "2024",
    },
    {
      name: "problem",
      type: "textarea",
    },
    {
      name: "solution",
      type: "textarea",
    },
    {
      name: "architecture",
      type: "textarea",
    },
    {
      name: "liveUrlOverride",
      type: "text",
    },
    {
      name: "githubUrlOverride",
      type: "text",
    },
  ],
};
