import { createUser } from "./db/user.controller";
import { getUser, getUserProgrammingLanguages } from "./github";

import { GithubUser } from "./github.model";
import { UserData } from "./db/user.model";
import { createUserProgrammingLanguages } from "./db/languages.controller";

async function convUserData(user: GithubUser): Promise<UserData> {
  return {
    id: user.id,
    username: user.login,
    name: user.name,
    location: user.location,
    company: user.company
  };
}

export async function processUser(username: string) {
  const user = await getUser(username);
  const languages = await getUserProgrammingLanguages(username);
  const userData = await convUserData(user);
  await createUser(userData);
  await createUserProgrammingLanguages(userData.id, languages);
}

