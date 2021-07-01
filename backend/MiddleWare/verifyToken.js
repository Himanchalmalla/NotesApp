import jwt from 'jsonwebtoken';

const authorizationKey = (req, res, next) => {
  const SECRET_KEY = `489ad745193e28f44103542c97ea42823aa5f092ec6bf291a97ac9a826a336bb7bb5670524b9500f2ba1bf5582bbf52403f3175d7f3463437b5df26bcba0f85f`;

  if (req.headers.authorization) {
    const accessToken = req.headers.authorization.split(' ')[1];
    jwt.verify(accessToken, SECRET_KEY, (err, user) => {
      if (err) {
        res.status(403).json('Invalid user');
      } else {
        req.user = user;
        next();
      }
    });
  } else {
    res.status(401).json('Unauthorized user');
  }
};

export default authorizationKey;
