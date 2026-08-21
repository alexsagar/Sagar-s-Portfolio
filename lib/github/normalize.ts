import { GitHubRepository } from "./types";

export function normalizeRepository(raw: any): GitHubRepository {
  return {
    id: raw.id,
    name: raw.name,
    fullName: raw.full_name,
    description: raw.description || null,
    url: raw.html_url,
    homepage: raw.homepage || null,
    primaryLanguage: raw.language || "TypeScript",
    stars: raw.stargazers_count || 0,
    forks: raw.forks_count || 0,
    createdDate: raw.created_at,
    updatedDate: raw.updated_at,
    pushedDate: raw.pushed_at,
    defaultBranch: raw.default_branch || "main",
    isArchived: Boolean(raw.archived),
    isFork: Boolean(raw.fork),
    topics: Array.isArray(raw.topics) ? raw.topics : [],
  };
}
