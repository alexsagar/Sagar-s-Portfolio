import { normalizeRepository } from "./normalize";
import { GitHubRepository, GitHubUserActivity } from "./types";

const GITHUB_USERNAME = process.env.GITHUB_USERNAME || process.env.NEXT_PUBLIC_GITHUB_USERNAME || "alexsagar";

// Fallback repositories if GitHub API is unconfigured or rate-limited
const FALLBACK_REPOS: GitHubRepository[] = [
  {
    id: 1,
    name: "SajiloKhata",
    fullName: "alexsagar/SajiloKhata",
    description: "Financial tracking and ledger management app built for small businesses.",
    url: "https://github.com/alexsagar/SajiloKhata",
    homepage: "https://sagar-nepali.com.np",
    primaryLanguage: "TypeScript",
    stars: 12,
    forks: 3,
    createdDate: "2024-01-10T00:00:00Z",
    updatedDate: "2026-08-20T00:00:00Z",
    pushedDate: "2026-08-20T00:00:00Z",
    defaultBranch: "main",
    isArchived: false,
    isFork: false,
    topics: ["nextjs", "react", "postgresql", "tailwindcss"],
  },
  {
    id: 2,
    name: "CinemaGhar",
    fullName: "alexsagar/CinemaGhar",
    description: "Movie exploration and ticket reservation dashboard UI with real-time seats.",
    url: "https://github.com/alexsagar/CinemaGhar",
    homepage: null,
    primaryLanguage: "JavaScript",
    stars: 8,
    forks: 2,
    createdDate: "2023-11-05T00:00:00Z",
    updatedDate: "2026-07-15T00:00:00Z",
    pushedDate: "2026-07-15T00:00:00Z",
    defaultBranch: "main",
    isArchived: false,
    isFork: false,
    topics: ["react", "node", "express", "mongodb"],
  },
  {
    id: 3,
    name: "Sagar-s-Portfolio",
    fullName: "alexsagar/Sagar-s-Portfolio",
    description: "Developer workspace portfolio with Payload CMS backend and GitHub API sync.",
    url: "https://github.com/alexsagar/Sagar-s-Portfolio",
    homepage: "https://sagar-nepali.com.np",
    primaryLanguage: "TypeScript",
    stars: 15,
    forks: 4,
    createdDate: "2024-02-01T00:00:00Z",
    updatedDate: "2026-08-21T00:00:00Z",
    pushedDate: "2026-08-21T00:00:00Z",
    defaultBranch: "portfolio-v2",
    isArchived: false,
    isFork: false,
    topics: ["nextjs", "typescript", "payload-cms", "tailwind"],
  }
];

export async function fetchUserRepositories(): Promise<GitHubRepository[]> {
  const token = process.env.GITHUB_TOKEN;
  const headers: Record<string, string> = {
    "Accept": "application/vnd.github+json",
    "User-Agent": "Sagar-Portfolio-App",
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  try {
    const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=30`, {
      headers,
      next: { revalidate: 3600 }, // ISR cache 1 hour
    });

    if (!res.ok) {
      console.warn(`[GitHub API] Repos request failed (${res.status}). Using fallback repos.`);
      return FALLBACK_REPOS;
    }

    const data = await res.json();
    if (!Array.isArray(data)) return FALLBACK_REPOS;

    return data.map(normalizeRepository);
  } catch (error) {
    console.error("[GitHub API] Error fetching repos:", error);
    return FALLBACK_REPOS;
  }
}

export async function fetchGitHubOverview(): Promise<GitHubUserActivity> {
  const repos = await fetchUserRepositories();
  const latestRepo = repos[0];

  return {
    username: GITHUB_USERNAME,
    publicReposCount: repos.length > 0 ? repos.length : 18,
    latestCommitMessage: "feat: redesign portfolio-v2 engineering console",
    latestRepoName: latestRepo?.name || "Sagar-s-Portfolio",
    latestPushedAt: latestRepo?.pushedDate || new Date().toISOString(),
    featuredRepos: repos.slice(0, 6),
  };
}
