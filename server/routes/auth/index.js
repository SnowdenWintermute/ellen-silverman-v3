const express = require("express");
const authMainRouter = express.Router();
const { authCheck, adminCheck } = require("../../middlewares/auth");

const createOrUpdateUser = require('./createOrUpdateUser')

authMainRouter.post("/create-or-update-user", authCheck, createOrUpdateUser);

module.exports = authMainRouter