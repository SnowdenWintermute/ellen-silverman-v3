const express = require("express");
const authMainRouter = express.Router();
const { authCheck, adminCheck } = require("../../middlewares/auth");

const createOrUpdateUser = require('./createOrUpdateUser')
const currentUser = require('./currentUser')

authMainRouter.post("/create-or-update-user", authCheck, createOrUpdateUser);
authMainRouter.post("/current-user", authCheck, currentUser);
authMainRouter.post("/current-admin", authCheck, adminCheck, currentUser);

module.exports = authMainRouter