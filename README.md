# GitHub CLI

This program should be executed with NodeJS `21.0.0` or greater.

## Configuration

All required configurations are to be added as environment variables in a `.env` file in this directory, following the structure in `.env.example`

### GitHub Authentication

This project requires a `GITHUB_TOKEN` for doing API Requests to GitHub, see [here](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#personal-access-tokens-classic) how to obtain one

### Database Authentication

- `DATABASE_HOST` and `DATABASE_PORT` should contain the hostname and the port of the PostgreSQL database 
- `DATABASE_USER` and `DATABASE_PASSWORD` should contain the credentials to login into the PostgreSQL database
- `DATABASE_NAME` should contain the database name of the **already existing** database to be used for this project(if using the `db/bootstrap.sh` for setting up, it creates the database `githubusers` as used in `.env.example`).

## Usage

### First Time Dependency Instalation

Run `npm i` to install the project's dependencies.

### First Time Database Setup (using migration)

The script `db/run_local.sh` launches a Docker Container to host the PostgreSQL database.
The `db/bootstrap.sh` creates the default database and sets up the tables per `db/create.sql` 

### Building
To build the project, the command `npm run build` needs to be executed.

### Executing

The CLI can be executed through `npm run start` or `node src/index.js` and can take 2 distinct arguments:

- `fetch <username>` fetches the information for the specific user in GitHub
- `list_all` which displays all the existing users in the database and its data
- `list_location <location>` which displays all the existing users which have the specified `location` in the database and its data 
- `list_language <language>` which displays all the existing users which have at least one repo with the specified `language` in the database and its data 

### Testing

Run `npm run test` to execute the tests.

## Data Model


