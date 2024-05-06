const mockQuery = jest.fn().mockResolvedValue({})
import { getUsers, getUsersByLanguage, getUsersByLocation } from "../db/user.controller";
import { getDbConnection } from '../db/connector';

jest.mock('../db/connector', () => ({
  getDbConnection: jest.fn().mockResolvedValue({
    query: mockQuery
  })
}));

describe('List Tests', () => {
  beforeEach(() => {
    mockQuery.mockClear();
  });
  it('list should attempt a read on the database', async () => {
    await getUsers();
    expect(getDbConnection).toHaveBeenCalled();
    expect(mockQuery).toHaveBeenCalled();
  });

  it('list_location should attempt a read on the database with location', 
    async () => {
      await getUsersByLocation("testLocation");
      expect(getDbConnection).toHaveBeenCalled();
      expect(mockQuery).toHaveBeenCalled();
      expect(mockQuery.mock.calls[0][0]).toContain(
        `location`
      );
      expect(mockQuery.mock.calls[0][1]).toContain(
        "testLocation"
      );
    });
  
  it('list_languages should attempt a read on the database with languages', 
    async () => {
      await getUsersByLanguage("testLanguage1");
      expect(getDbConnection).toHaveBeenCalled();
      expect(mockQuery).toHaveBeenCalled();
      expect(mockQuery.mock.calls[0][0]).toContain(
        `language`
      );
      expect(mockQuery.mock.calls[0][1]).toContain(
        "testLanguage1"
      );
    });
});

