import http from 'http';
import path from 'path';

import dotenv from 'dotenv';

process.on('uncaughtException', (err: Error) => {
	console.log('Error: 💥 UNCAUGHT EXCEPTION! Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

// __dirname === '..../dist'
const dotenvOutput = dotenv.config({ path: path.resolve(__dirname, '..', '.env') });

if (dotenvOutput.error) {
	console.log('Error: 💥 ERROR LOADING .env FILE');
	console.log(dotenvOutput.error);
}
const port = process.env.PORT || 3000;

import app from './app';

const server =  http.createServer(app);

server.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${ port }`);
});

process.on('unhandledRejection', (err: Error) => {
  console.log('Error: 💥 UNHANDLED REJECTION! Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

process.on('SIGTERM', () => {
  console.log('👋 SIGTERM RECEIVED. Shutting down gracefully');
  server.close(() => {
    console.log('💥 Process terminated!');
  });
});


