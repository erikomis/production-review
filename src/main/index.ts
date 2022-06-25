import { ExpressServer } from '~/infra/http/express/server';

export async function main() {
  const server = new ExpressServer();
  server.listen();

  process.on('SIGTERM', () => {
    console.log('finish server');
    server.close();
    process.exit(0);
  });
}
