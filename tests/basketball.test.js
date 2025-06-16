const request = require('supertest');
const app = require('../app'); // express app

describe('Basketball routes', () => {
  it('should get all basketballs', async () => {
    const res = await request(app).get('/basketball');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});