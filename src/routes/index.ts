import { IncomingMessage, ServerResponse } from 'http';

import userRouter from './userRouter';

const router = (req: IncomingMessage, res: ServerResponse) => {
  switch (true) {
    // For any route starting with '/user'
    case !!req.url?.match(/^\/users/g):
      userRouter(req, res);
      break;

    default:
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end(JSON.stringify({ message: 'Route Not found' }));
  }
};

export default router;
