const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('../routes/auth');
const quoteRoutes = require('../routes/quotes');
const policyRoutes = require('../routes/policies');

// Create a minimal app to test the routes
const app = express();
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/quotes', quoteRoutes);
app.use('/api/policies', policyRoutes);

// Mock the file system to avoid writing actual PDFs during tests
jest.mock('fs', () => {
  return {
    promises: {
      writeFile: jest.fn().mockResolvedValue(),
    },
  };
});

describe('Policy Routes', () => {
  let token;
  let quoteId;

  beforeAll(async () => {
    // Register and login a user
    const userRes = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Policy Test User',
        email: 'policy@example.com',
        password: 'password123',
      });
    token = userRes.body.token;

    // Create a quote to be used for policy binding
    const quoteRes = await request(app)
      .post('/api/quotes')
      .set('x-auth-token', token)
      .send({ insuranceType: 'property', quoteDetails: { address: '456 Test Ave' } });
    quoteId = quoteRes.body._id;
  });

  it('should create a new policy from a quote', async () => {
    const res = await request(app)
      .post('/api/policies')
      .set('x-auth-token', token)
      .send({ quoteId });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('policyNumber');
    expect(res.body.status).toBe('active');

    // Verify the quote status was updated
    const Quote = mongoose.model('Quote');
    const quote = await Quote.findById(quoteId);
    expect(quote.status).toBe('bound');
  });

  it('should not create a policy for an invalid quoteId', async () => {
    const invalidQuoteId = new mongoose.Types.ObjectId();
    const res = await request(app)
      .post('/api/policies')
      .set('x-auth-token', token)
      .send({ quoteId: invalidQuoteId });

    expect(res.statusCode).toEqual(404);
  });

  it('should get all policies for an authenticated user', async () => {
    const res = await request(app)
      .get('/api/policies')
      .set('x-auth-token', token);

    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });
});
