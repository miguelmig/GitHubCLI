export interface GithubUser {
  id: number;
  login: string;
  name: string;
  location: string | null;
  company: string | null;
}

export interface GithubRepo {
  id: number
  name: string
  language: string;
  private: boolean
  fork: boolean
}

