import http from 'http';
import router from './routes';

const server = http.createServer((req, res) => {
  router(req, res);
});

const PORT = process.env.port || 3000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
