import { getDbConnection } from './connector';
import { UserData } from './user.model';

export async function getUsers() : Promise<UserData[]> {
  const db = await getDbConnection();
  return await db.query(`SELECT * FROM "user"`);
}

export async function 
getUsersByLocation(location: string): Promise<UserData[]> {
  const db = await getDbConnection();
  return await db.query(`SELECT "user".* FROM "user" 
    WHERE "user"."location"=$1`, [location]);
}

export async function 
getUsersByLanguage(language: string) : Promise<UserData[]> {
  const db = await getDbConnection();
  return await db.query(`SELECT "user".* FROM "user" 
    JOIN "languages" ON "user"."id"="languages"."user_id"
    WHERE "languages"."language"=$1`, [language]);
}

export async function createUser(user: UserData): Promise<void> {
  const db = await getDbConnection();
  await db.query(
    `INSERT INTO "user" (id, username, name, location, company)  
    VALUES ($1, $2, $3, $4, $5)`, 
    [user.id, user.username, user.name, user.location, user.company]
  );
}


