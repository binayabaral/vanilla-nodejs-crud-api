import { StatusCodes } from 'http-status-codes';
import { IncomingMessage, ServerResponse } from 'http';

import httpMethods from '../enums/httpMethods';
import * as userController from '../controllers/userController';

const router = (req: IncomingMessage, res: ServerResponse) => {
  switch (true) {
    case req.url === '/users' && req.method === httpMethods.GET:
      userController.getAllUsers(req, res);
      break;

    // For Routes like '/users/1'
    case req.url?.match(/\/users\/([0-9]+)/) && req.method === httpMethods.GET:
      userController.getUser(req, res);
      break;

    case req.url === '/users' && req.method === httpMethods.POST:
      userController.createUser(req, res);
      break;

    // For Routes like '/users/1'
    case req.url?.match(/\/users\/([0-9]+)/) && req.method === httpMethods.PUT:
      userController.updateUser(req, res);
      break;

    // For Routes like '/users/1'
    case req.url?.match(/\/users\/([0-9]+)/) && req.method === httpMethods.DELETE:
      userController.deleteUser(req, res);
      break;

    default:
      res.writeHead(StatusCodes.NOT_FOUND, { 'Content-Type': 'text/plain' });
      res.end(JSON.stringify({ message: 'Route Not found' }));
  }
};

export default router;
