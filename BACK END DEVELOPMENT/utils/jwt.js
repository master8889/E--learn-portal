import jwt from 'jsonwebtoken';

const generateToken = (user) => {
  const payload = {
    id: user.id,
    email: user.email
  };
  return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1h' });
};

export { generateToken };