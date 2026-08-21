import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { Projects } from "./payload/collections/Projects";
import { ContactMessages } from "./payload/collections/ContactMessages";

export default buildConfig({
  admin: {
    user: "users",
  },
  collections: [
    {
      slug: "users",
      auth: true,
      fields: [],
    },
    Projects,
    ContactMessages,
  ],
  secret: process.env.PAYLOAD_SECRET || "fallback_secret_key_minimum_32_characters_long_12345",
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || "postgresql://postgres:postgres@127.0.0.1:5432/portfolio_v2",
    },
  }),
});
