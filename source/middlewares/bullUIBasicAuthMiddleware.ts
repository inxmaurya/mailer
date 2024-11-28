import { Request, Response, NextFunction } from 'express';

/**
 * Basic Authentication Middleware
 */
const bullUIBasicAuthMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.setHeader('WWW-Authenticate', 'Basic');
    res.status(401).send('Authentication required');
    return;
  }

  // Decode Base64 credentials
  const credentials = Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
  const [username, password] = credentials;

  // Check against environment variables or hardcoded credentials
  const validUsername = process.env.BULL_UI_USER;
  const validPassword = process.env.BULL_UI_PASS;
  if (username === validUsername && password === validPassword) {
    next();
  } else {
    res.setHeader('WWW-Authenticate', 'Basic');
    res.status(401).send('Invalid credentials');
  }
};

export default bullUIBasicAuthMiddleware;
