const express = require('express');
const validate = require('express-validation');
const controller = require('../../controllers/user/auth.controller');
const oAuthLogin = require('../../middlewares/auth').oAuth;
const {
  login,
  register,
  oAuth,
  refresh,
  sendPasswordReset,
  passwordReset,
} = require('../../validations/auth.validation');

const router = express.Router();

router.route('/register')
  .post(validate(register), controller.register);

router.route('/user-login')
  .post(validate(login), controller.user_login);

router.route('/user-refresh-token')
  .post(validate(refresh), controller.refresh);

router.route('/user-send-password-reset')
  .post(validate(sendPasswordReset), controller.sendPasswordReset);

router.route('/user-reset-password')
  .post(validate(passwordReset), controller.resetPassword);
// router.route('/google')
//   .post(validate(oAuth), oAuthLogin('google'), controller.oAuth);

module.exports = router;
