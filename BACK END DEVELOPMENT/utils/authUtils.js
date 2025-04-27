import jwt from 'jsonwebtoken';

const generateToken = (user) => {
  const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY, {
    expiresIn: '1h'
  });
  return token;
};

export default generateToken;