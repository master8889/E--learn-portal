import jwt from 'jsonwebtoken';

const authenticate = async (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (!authHeader) {
    return res.status(401).json({ error: 'Authentication failed' });
  }

  const token = authHeader.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ error: 'Authentication failed' });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    console.error(`Token verification failed: ${err.message}`);
    res.status(401).json({ error: 'Invalid token', message: err.message });
  }
};

export default authenticate;