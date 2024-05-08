// Expects process.env.GITHUB_TOKEN
import { GithubUser, GithubRepo } from "./github.model";

async function githubRequest(endpoint: string, options?: RequestInit) {
  if(!options) {
    options = {};
  }

  const response = await fetch(`https://api.github.com/${endpoint}`, {
    ...options,
    headers: {
      ...options.headers,
      'Accept': 'application/vnd.github+json',
      'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`,
      'X-GitHub-Api-Version': '2022-11-28'
    }
  });

  if (!response.ok) {
    let message = `GitHub HTTP error! Status Code: ${response.status}`;
    if (response.status === 401) {
      message = `GITHUB_TOKEN cant access '${endpoint}' endpoint!`;
    }
    throw new Error(message, { 
      cause: response.status 
    });
  }
  return response.json();
}

export async function getUserProgrammingLanguages
(username: string): Promise<string[]> {
  const repos: GithubRepo[] = await githubRequest(`users/${username}/repos`);
  const languages = repos.filter((repo: GithubRepo) => repo.language).map(
    (repo: GithubRepo) => repo.language) as string[];
  return [...new Set(languages)];
}

export async function getUser(username: string): Promise<GithubUser> {
  try {
    return await githubRequest(`users/${username}`);
  } catch (error) {
    if (error.cause === 404) {
      throw new Error(`GitHub user not found!`);
    }
    throw error;
  }
}

