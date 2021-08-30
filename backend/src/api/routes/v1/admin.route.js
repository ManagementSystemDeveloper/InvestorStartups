const express = require('express');
const controller = require('../../controllers/admin/admin.controller');
const authController = require('../../controllers/admin/admin.auth.controller');
const investorController = require('../../controllers/admin/investors.controller');
const startupController = require('../../controllers/admin/startup.controller');
const { login } = require('../../validations/auth.validation');
const validate = require('express-validation');
const { createUser } = require('../../validations/user.validation');
const { authorize, ADMIN, LOGGED_USER } = require('../../middlewares/auth');

const router = express.Router();

router.route('/auth/login')
      .post(validate(login), authController.admin_login);

router.route('/investor/add')
      .post(authorize(ADMIN), validate(createUser), investorController.createUser);

router.route('/investor/update')
      .post(authorize(ADMIN), investorController.updateUser);

router.route('/investor/update-password')
      .post(authorize(ADMIN), investorController.changeUserPassword);

router.route('/investor/remove')
      .post(authorize(ADMIN), investorController.deleteUser);

router.route('/investor/all')
      .get(authorize(ADMIN), investorController.getAllUser);

router.route('/startup/add')
      .get(authorize(ADMIN), startupController.createStartup);

router.route('/')
      .get(controller.getAdmins);

module.exports = router;
