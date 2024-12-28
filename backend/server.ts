import cors from 'cors';
import express from 'express';
import jwt from 'jsonwebtoken';
const app = express();
const port = 9001;

// Public Key (replace with your actual public key)
const publicKey = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAlBuKnrGKgZusnP6XqXp2ScK1T1cGdgsh3k3j/w6/NyHFcDtwHyMmNHBSV+yzAaIktu23IPkVCS6oya/sZJjRtnCalGlzpdv7t8YZkXDC3tj9AKELyJGtE0F9xYpB++T8Zfl/92T7GOpQLGvaVRTWhFQ64GNAn2ogcXmuelluoV5S+U0Ruzb4Z2tB+ox0I5gr1iVRie0UTSwM/u0Z6beyd0ehA990c6ApchMUGg9cGKeV4qyttknj+nsdIneV1alwecJTXynXOgcxnggLSn7+pk3fAHOrC51SUIMY2z6Ka2z8qaj87cKXk4RlxePosOoNb/7WZUTgEF7QzMh2pRbMFwIDAQAB
-----END PUBLIC KEY-----`;

// CORS setup
const corsOptions = {
  origin: '*', // Replace with your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,  // Allow cookies if needed
};

app.use(cors(corsOptions)); // Apply CORS middleware
// Middleware to verify JWT
const verifyJWT = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Extract token from 'Authorization' header
  
  if (!token) {
    return res.status(403).json({ message: 'Token not provided' });
  }

  try {
    // Verify the JWT using the public key
    const decoded = jwt.verify(token, publicKey, { algorithms: ['RS256'] });
    console.log('Decoded Token:', decoded); // Log the decoded token
    //@ts-ignore
    req.user  = decoded; // You can pass the decoded user info to the request object
    next(); // Continue to the next middleware or route handler
  } catch (error) {
    console.error('Token verification failed:', error);
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

// Protected route
 //@ts-ignore
app.get('/protected', verifyJWT, (req: express.Request, res: express.Response) => {
   //@ts-ignore
  res.json({ message: 'Access granted', user: req.user });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});