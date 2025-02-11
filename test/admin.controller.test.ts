import { AppDataSource } from '../src/data-source'; 
import request from 'supertest';
import { app } from '../src/server';
 
describe('Admin Controller Tests', () => {
  beforeAll(async () => {
    jest.setTimeout(20000); 
 
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }
  });
 
  it('should return a 200 status for the admin route', async () => {
    const response = await request(app).get('/api/admin');
    expect(response.status).toBe(200);
  });
 
  afterAll(async () => {
    
    if (AppDataSource.isInitialized) {
      await AppDataSource.destroy();
    }
  });
});
 