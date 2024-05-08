import { getDbConnection } from './connector';
import { LanguageData } from './languages.model';

export async function
getUsersLanguages(user_id: number): Promise<LanguageData[]> {
  const db = await getDbConnection();
  return await db.query(`SELECT * FROM "languages" WHERE user_id=$1`, 
    [user_id]);
}

export async function createUserProgrammingLanguages
(user_id: number, languages: string[]): Promise<string> {
  if (languages.length === 0) {
    return;
  }

  const db = await getDbConnection();
  
  let query = `INSERT INTO "languages" (user_id, language) VALUES `;
  const params: (number | string)[] = [user_id] 
  for (const language of languages) {
    const index = languages.indexOf(language);
    query += `($1, \$${index + 1 + 1}),`; // Skip ahead of user_id
    params.push(language);
  }

  query = query.slice(0, -1); // Remove last comma
  await db.query(
    query,
    params
  );
}



