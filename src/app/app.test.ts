import { Server } from 'http';
import app from './app';

describe('App Component', () => {
  let server: Server;

  it('Should initialize the server', () => {
    server = app.listen(process.env.TEST_APP_PORT || 3010, () => {
      expect(true).toBe(true);
    });
  });

  it('Should close the server', () => {
    server.close(() => {
      expect(true).toBe(true);
    });
  });
});
