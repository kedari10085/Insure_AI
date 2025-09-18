const request = require('supertest');
const express = require('express');
const authRoutes = require('../routes/auth');
const quoteRoutes = require('../routes/quotes');
const authMiddleware = require('../middleware/authMiddleware');

// Create a minimal app to test the routes
const app = express();
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/quotes', quoteRoutes);

describe('Quote Routes', () => {
  let token;
  let userId;

  beforeAll(async () => {
    // Register and login a user to get a token for protected routes
    const userRes = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Quote Test User',
        email: 'quote@example.com',
        password: 'password123',
      });
    token = userRes.body.token;

    // A simple way to get the user ID from the token for this test
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const payload = JSON.parse(Buffer.from(base64, 'base64').toString());
    userId = payload.user.id;
  });

  it('should create a new quote for an authenticated user', async () => {
    const res = await request(app)
      .post('/api/quotes')
      .set('x-auth-token', token)
      .send({
        insuranceType: 'auto',
        quoteDetails: { make: 'Toyota', model: 'Camry', year: '2022' },
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('price');
    expect(res.body.insuranceType).toBe('auto');
  });

  it('should get all quotes for an authenticated user', async () => {
    // Create a quote first
    await request(app)
      .post('/api/quotes')
      .set('x-auth-token', token)
      .send({ insuranceType: 'property', quoteDetails: { address: '123 Main St' } });

    const res = await request(app)
      .get('/api/quotes')
      .set('x-auth-token', token);

    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('should not create a quote for an unauthenticated user', async () => {
    const res = await request(app)
      .post('/api/quotes')
      .send({ insuranceType: 'auto' });

    expect(res.statusCode).toEqual(401);
  });
});
