const request = require('supertest');
const app = require('./server');

describe('API BOT server', () => {
  test('GET /action returns default move and action', async () => {
    const res = await request(app).get('/action');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ move: 'STAY', action: 'NONE' });
  });

  test('POST /set-move updates move', async () => {
    await request(app)
      .post('/set-move')
      .send({ move: 'LEFT' })
      .set('Content-Type', 'application/json');
    const res = await request(app).get('/action');
    expect(res.body.move).toBe('LEFT');
  });

  test('POST /set-action updates action', async () => {
    await request(app)
      .post('/set-action')
      .send({ action: 'JUMP' })
      .set('Content-Type', 'application/json');
    const res = await request(app).get('/action');
    expect(res.body.action).toBe('JUMP');
  });

  test('POST /set-action updates action to COLLECT', async () => {
    await request(app)
      .post('/set-action')
      .send({ action: 'COLLECT' })
      .set('Content-Type', 'application/json');
    const res = await request(app).get('/action');
    expect(res.body.action).toBe('COLLECT');
  });

  test('POST /set-move and /set-action together', async () => {
    await request(app)
      .post('/set-move')
      .send({ move: 'RIGHT' })
      .set('Content-Type', 'application/json');
    await request(app)
      .post('/set-action')
      .send({ action: 'RUN' })
      .set('Content-Type', 'application/json');
    const res = await request(app).get('/action');
    expect(res.body).toEqual({ move: 'RIGHT', action: 'RUN' });
  });

  test('GET / returns HTML', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.headers['content-type']).toMatch(/html/);
  });
});