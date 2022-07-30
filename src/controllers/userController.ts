import { StatusCodes } from 'http-status-codes';
import { IncomingMessage, ServerResponse } from 'http';

import * as userService from '../services/userService';
import { getRequestBody, sendErrorResponse } from '../utils/common';

/**
 * Get all users.
 * @param {IncomingMessage} req
 * @param {ServerResponse} res
 */
export const getAllUsers = (req: IncomingMessage, res: ServerResponse) => {
  userService
    .getAllUsers()
    .then(data => res.writeHead(StatusCodes.OK, { 'Content-Type': 'application/json' }).end(JSON.stringify(data)))
    .catch(err => sendErrorResponse(res, err.statusCode, err.message));
};

/**
 * Get a single user.
 * @param {IncomingMessage} req
 * @param {ServerResponse} res
 */
export const getUser = (req: IncomingMessage, res: ServerResponse) => {
  const id = req.url?.split('/')[2];

  if (!id) {
    sendErrorResponse(res, StatusCodes.BAD_REQUEST, 'User id is required');

    return;
  }

  userService
    .getUser(+id)
    .then(data => res.writeHead(StatusCodes.OK, { 'Content-Type': 'application/json' }).end(JSON.stringify(data)))
    .catch(err => sendErrorResponse(res, err.statusCode, err.message));
};

/**
 * Create a new user.
 * @param {IncomingMessage} req
 * @param {ServerResponse} res
 */
export const createUser = (req: IncomingMessage, res: ServerResponse) => {
  getRequestBody(req).then(body => {
    const { name, email } = JSON.parse(body);

    if (!name || !email) {
      sendErrorResponse(res, StatusCodes.BAD_REQUEST, 'Name and email are required');

      return;
    }

    userService
      .createUser({ name, email })
      .then(data => res.writeHead(StatusCodes.OK, { 'Content-Type': 'application/json' }).end(JSON.stringify(data)))
      .catch(err => sendErrorResponse(res, err.statusCode, err.message));
  });
};

/**
 * Update an existing user.
 * @param {IncomingMessage} req
 * @param {ServerResponse} res
 */
export const updateUser = (req: IncomingMessage, res: ServerResponse) => {
  const id = req.url?.split('/')[2];

  if (!id) {
    sendErrorResponse(res, StatusCodes.BAD_REQUEST, 'User id is required');

    return;
  }

  getRequestBody(req).then(body => {
    const { name, email } = JSON.parse(body);

    if (!name || !email) {
      sendErrorResponse(res, StatusCodes.BAD_REQUEST, 'Name or email is required');

      return;
    }

    userService
      .updateUser({ name, email, id: +id })
      .then(data => res.writeHead(StatusCodes.OK, { 'Content-Type': 'application/json' }).end(JSON.stringify(data)))
      .catch(err => sendErrorResponse(res, err.statusCode, err.message));
  });
};

/**
 * Delete an existing user.
 * @param {IncomingMessage} req
 * @param {ServerResponse} res
 */
export const deleteUser = (req: IncomingMessage, res: ServerResponse) => {
  const id = req.url?.split('/')[2];

  if (!id) {
    sendErrorResponse(res, StatusCodes.BAD_REQUEST, 'User id is required');

    return;
  }

  userService
    .deleteUser(+id)
    .then(data => res.writeHead(StatusCodes.OK, { 'Content-Type': 'application/json' }).end(JSON.stringify(data)))
    .catch(err => sendErrorResponse(res, err.statusCode, err.message));
};
