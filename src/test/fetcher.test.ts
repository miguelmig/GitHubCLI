import { processUser } from "../fetcher";
import { getUser } from "../github";
import { createUser } from "../db/user.controller";
import { createUserProgrammingLanguages } from "../db/languages.controller";

jest.mock('../db/user.controller', () => ({
  createUser: jest.fn().mockResolvedValue({}),
}));

jest.mock('../db/languages.controller', () => ({
  createUserProgrammingLanguages: jest.fn().mockResolvedValue({})
}));

jest.mock('../github', () => ({
  getUser: jest.fn().mockResolvedValue({}),
  getUserProgrammingLanguages: jest.fn().mockResolvedValue({})
}));

describe('Fetcher Tests', () => {
  it('should attempt a GitHub call', async () => {
    await processUser("testuser");
    expect(getUser as jest.Mock).toHaveBeenCalled();
  });

  it('should attempt to create user in db', async () => {
    await processUser("testuser");
    expect(createUser as jest.Mock).toHaveBeenCalled();
  });

  it('should attempt to create user languages in db', async () => {
    await processUser("testuser");
    expect(createUserProgrammingLanguages as jest.Mock).toHaveBeenCalled();
  });
});

