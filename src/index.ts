import { program } from 'commander';
import dotenv from 'dotenv';
import { 
  getUsers, 
  getUsersByLanguage, 
  getUsersByLocation 
} from './db/user.controller';
import { processUser } from './fetcher';
import { printTable } from 'console-table-printer';
import { UserData } from './db/user.model';
import { getUsersLanguages } from './db/languages.controller';
dotenv.config();

const getUsersLangs = async (users: UserData[]) => {
  const usersWithLanguages = await Promise.all(users.map(async (user) => {
    const languages = await getUsersLanguages(user.id);
    return { ...user, languages };
  }));
  return usersWithLanguages;
};

const addUserLanguages = async (users: UserData[]) => {
  const usersLanguages = await getUsersLangs(users);
  return usersLanguages.map((user) => ({...user, 
    languages: user.languages.map((lang) => lang.language)
      .join(', ')}));
};

const main = async () => {
  // Sanity Checks
  let isReady = true;
  if (!process.env.GITHUB_TOKEN) {
    console.error("GITHUB_TOKEN is not set");
    isReady = false;
  }

  if (!process.env.DATABASE_HOST || 
    !process.env.DATABASE_PORT || 
    !process.env.DATABASE_USER || 
    !process.env.DATABASE_PASSWORD || 
    !process.env.DATABASE_NAME) {
    console.error("Database environment variables are not set");
    isReady = false;
  }

  if (!isReady) {
    console.error("Exiting due to missing environment variables");
    process.exit(1);
  }

  program.name("GitHub CLI tool")
    .description("CLI to interact with GitHub data")
    .version("1.0.0");

  program.command('fetch <username>')
    .description('Fetches the GitHub data for the given username')
    .action(async (username) => {
      console.log(`Fetching data for user: ${username}`);
      try {
        const user = await processUser(username);
        console.log(`User ${username} successfully fetched and stored`);
      } catch (error) {
        console.error(`Error fetching/saving user: ${username}`);
        console.error(error.message);
      }
    });
  
  program.command('list_all')
    .description('Lists all the existing GitHub users')
    .action(async () => {
      console.log("Listing existing GitHub users");
      try {
        const users = await getUsers();
        const usersLanguages = await addUserLanguages(users);
        printTable(usersLanguages);
      } catch (error) {
        console.error("Error fetching users from database");
        console.error(error.message);
      }
    });

  program.command('list_location <location>')
    .description('Lists all the existing GitHub users')
    .action(async (location) => {
      console.log("Listing existing GitHub users");
      try {
        const users = await getUsersByLocation(location);
        const usersLanguages = await addUserLanguages(users);
        printTable(usersLanguages);
      } catch (error) {
        console.error("Error fetching users from database");
        console.error(error.message);
      }
    });
    
  program.command('list_language <language>')
    .description('Lists all the existing GitHub users')
    .action(async (language) => {
      console.log("Listing existing GitHub users");
      try {
        const users = await getUsersByLanguage(language);
        const usersLanguages = await addUserLanguages(users);
        printTable(usersLanguages);
      } catch (error) {
        console.error("Error fetching users from database");
        console.error(error.message);
      }
    });

  program.parse(process.argv);
};

main();
