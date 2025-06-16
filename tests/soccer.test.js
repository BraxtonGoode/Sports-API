const request = require('supertest');
const app = require('../app'); // express app

describe('Soccer routes', () => {
  it('should get all soccer entries', async () => {
    const res = await request(app).get('/soccer');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  }); 
});