import User from '../Model/userModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import Auth from '../Model/authModel.js';

export const addUser = async (req, res) => {
  const { firstName, lastName, dateOfBirth, email, password } = req.body;
  try {
    const userExist = await User.findOne({ email });
    if (userExist) {
      res.status(400).json('user already Exist');
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const user = new User({
        firstName,
        lastName,
        dateOfBirth,
        email,
        password: hashedPassword,
      });
      const saveUser = await user.save();
      if (saveUser) {
        res.status(200).json('User Added');
        console.log(req.body);
      } else {
        res.status(400).json('Failed to register');
      }
    }
  } catch (e) {
    console.log(e);
  }
};
export const getUser = async (req, res) => {
  try {
    const getUser = await User.find();
    if (getUser) {
      res.status(200).json(getUser);
    } else {
      res.status(400).json('No user Find');
    }
  } catch (e) {
    console.log(e);
  }
};
export const getSingleUser = async (req, res) => {
  const { id } = req.user;
  try {
    const getUser = await User.findById(id);
    if (!getUser) return res.status(400).json('No user Find');
    res.status(200).json(getUser);
  } catch (e) {
    console.log(e);
  }
};

export const logUser = async (req, res) => {
  const SECRET_KEY = `489ad745193e28f44103542c97ea42823aa5f092ec6bf291a97ac9a826a336bb7bb5670524b9500f2ba1bf5582bbf52403f3175d7f3463437b5df26bcba0f85f`;
  const REFRESH_TOKEN_KEY =
    '001d5cdf1dcc98d6840971dc738d79db848f8e6c61166f5bbad52847d7b46c48a5f0adaeb9ab46404605e4b70e567fa7d234a1e4e0bc9463cbb958082d0ca463';
  const { email, password } = req.body;
  try {
    const userOne = await User.findOne({ email: email });

    if (userOne) {
      const validUser = await bcrypt.compare(password, userOne.password);
      const payload = {
        id: userOne._id,
      };
      if (validUser) {
        const accessToken = jwt.sign(payload, SECRET_KEY, {
          expiresIn: '1000s',
        });
        const refreshToken = jwt.sign(payload, REFRESH_TOKEN_KEY);
        const newRefreshToken = new Auth({ authToken: refreshToken });
        const saveRefreshToken = await newRefreshToken.save();
        if (saveRefreshToken) {
          res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            path: '/',
          });
        } else {
          res.status(500);
        }
        res.send({ accessToken });
      } else {
        res.status(404).json('Invalid email/password');
      }
    } else {
      res.status(404).json('Invalid email/password');
    }
  } catch (e) {
    console.log(e);
  }
};
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, dateOfBirth, email, password } = req.body;
  try {
    const updateData = await User.findByIdAndUpdate(id);
    if (firstName) {
      updateData.firstName = firstName;
    }
    if (lastName) {
      updateData.lastName = lastName;
    }
    if (dateOfBirth) {
      updateData.dateOfBirth = dateOfBirth;
    }
    if (email) {
      updateData.email = email;
    }
    if (password) {
      updateData.password = password;
    }
    const updateResult = await updateData.save();
    if (updateResult) {
      res.status(200).json('User Record Updated');
    } else {
      res.status(400).json('Failed to update');
    }
  } catch (e) {
    console.log(e);
  }
};
export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const deleteUserRecord = await User.findByIdAndDelete(id);
    if (deleteUserRecord) {
      res.status(200).json('User Deleted');
    } else {
      res.status(400).json('No user Find to delete');
    }
  } catch (e) {
    console.log(e);
  }
};

export const logoutUser = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) return res.status(400);
    await Auth.findOneAndDelete({ refreshToken });
    res.clearCookie('refreshToken', { Option: {} });
    res.sendStatus(204);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};
