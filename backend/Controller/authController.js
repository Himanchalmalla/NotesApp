import Auth from '../Model/authModel.js';
import jwt from 'jsonwebtoken';

export const refreshToken = async (req, res) => {
  const REFRESH_TOKEN_KEY =
    '001d5cdf1dcc98d6840971dc738d79db848f8e6c61166f5bbad52847d7b46c48a5f0adaeb9ab46404605e4b70e567fa7d234a1e4e0bc9463cbb958082d0ca463';
  const { refreshToken } = req.cookie;
  try {
    const findRefreshToken = await Auth.findOne({ refreshToken });
    if (findRefreshToken) {
      jwt.verify(refreshToken, REFRESH_TOKEN_KEY, (err, user) => {
        if (err) {
          console.log(err);
          res.status(403);
        }
        const { firstName, lastName, dateOfBirth, email } = user;
        const accessToken = jwt.sign(
          { firstName, lastName, dateOfBirth, email },
          REFRESH_TOKEN_KEY,
          {
            expiresIn: '100s',
          }
        );
        res.status(200).json(accessToken);
      });
    } else {
      res.status(401);
    }
  } catch (e) {
    console.log(e);
  }
};
