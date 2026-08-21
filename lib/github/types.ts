export interface GitHubRepository {
  id: number;
  name: string;
  fullName: string;
  description: string | null;
  url: string;
  homepage: string | null;
  primaryLanguage: string | null;
  stars: number;
  forks: number;
  createdDate: string;
  updatedDate: string;
  pushedDate: string;
  defaultBranch: string;
  isArchived: boolean;
  isFork: boolean;
  topics: string[];
}

export interface GitHubUserActivity {
  username: string;
  publicReposCount: number;
  latestCommitMessage?: string;
  latestRepoName?: string;
  latestPushedAt?: string;
  featuredRepos: GitHubRepository[];
}
