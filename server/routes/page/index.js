const express = require("express");
const pageMainRouter = express.Router();
const { authCheck, adminCheck } = require("../../middlewares/auth");

const { incrementPageViewCounter } = require("./incrementPageViewCounter");
const { create } = require("./createPage");
const { getPage } = require("./getPage");

pageMainRouter.post("/", authCheck, adminCheck, create);
pageMainRouter.get("/:slug", getPage);
pageMainRouter.put("/:slug", incrementPageViewCounter);

module.exports = pageMainRouter;
