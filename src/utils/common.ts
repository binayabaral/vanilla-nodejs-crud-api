import fs from 'fs';
import { StatusCodes } from 'http-status-codes';
import { IncomingMessage, ServerResponse } from 'http';

/**
 * Send an error response to the client.
 * @param {ServerResponse} res
 * @param {StatusCodes} statusCode
 * @param {string} message
 */
export const sendErrorResponse = (res: ServerResponse, statusCode: StatusCodes, message: string) => {
  res.writeHead(statusCode, { 'Content-Type': 'text/plain' });
  res.end(JSON.stringify({ message }));
};

/**
 * Get Request body from request object.
 * @param {IncomingMessage} req
 * @returns {Promise<string>}
 */
export const getRequestBody = (req: IncomingMessage): Promise<string> => {
  return new Promise((resolve, reject) => {
    try {
      let body = '';

      req.on('data', chunk => {
        body += chunk.toString();
      });

      req.on('end', () => {
        resolve(body);
      });
    } catch (error) {
      reject(error);
    }
  });
};

/**
 * Write to a file.
 * @param {string} filename
 * @param {object} content
 */
export const writeDataToFile = (filename: string, content: object) => {
  fs.writeFileSync(filename, JSON.stringify(content), 'utf8');
};
