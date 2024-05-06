import pgp from 'pg-promise';

export const pgpInstance = pgp();

let dbConnection : pgp.IDatabase<any> = null;

export function getDbConnection() {
  if (!dbConnection) {
    // Database connection details;
    const cn = {
      host: process.env.DATABASE_HOST, // 'localhost' is the default;
      port: Number.parseInt(process.env.DATABASE_PORT), // 5432 is the default;
      database: process.env.DATABASE_NAME,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,

      allowExitOnIdle: true
    };

    dbConnection = pgpInstance(cn);
  }
  return dbConnection;
}
