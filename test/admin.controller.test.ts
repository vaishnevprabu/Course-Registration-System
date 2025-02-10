import request from 'supertest';
import { app } from '../src/server'; 

describe('Admin Controller Tests', () => {
  it('should return a 200 status for the admin route', async () => {
    const response = await request(app).get('/api/admin');
    expect(response.status).toBe(200); 
  });
});
