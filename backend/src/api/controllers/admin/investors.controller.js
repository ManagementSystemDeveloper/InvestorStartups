const httpStatus = require('http-status');
const { omit } = require('lodash');
const User = require('../../models/user.model');
exports.createUser = async (req, res, next) => {
    try {
      req.body.role = "user";
      const user = await new User(req.body).save();
      const userTransformed = user.transform();
      res.status(httpStatus.CREATED);
      return res.json({ user: userTransformed });
    } catch (error) {
      return next(User.checkDuplicateEmail(error));
    }
}

exports.getAllUser = async (req, res, next) => {
  try {
    const users = await User.list(req.body);
    const transformedUsers = users.map((user) => {
      user = user.transform();
      user.investments = 2;
      user.startups = 2;
      return user;
    });

    res.json(transformedUsers);
  } catch (error) {
    next(error);
  }
}

exports.updateUser = async (req, res, next) => {
  const existUser = await User.findById(req.body.id);
  const updateData = omit(req.body, ['id']);
  const user = Object.assign(existUser, updateData);

  user.save()
    .then((savedUser) => res.json(savedUser.transform()))
    .catch((e) => next(User.checkDuplicateEmail(e)));
};

exports.changeUserPassword = async (req, res, next) => {
  try {
    const { id, password } = req.body;
    const user = await User.findById(id);
    user.password = password;
    await user.save();
    // emailProvider.sendPasswordChangeEmail(user);
    res.status(httpStatus.OK);
    return res.json('Password Updated');
  } catch (error) {
    return next(error);
  }
}

exports.deleteUser = async (req, res, next) => {
  try {
    const { id } = req.body;
    const user = await User.findById(id);
    await user.remove();
    res.status(httpStatus.OK);
    return res.json('User is deleted');
  } catch (error) {
    return next(error);
  }
}