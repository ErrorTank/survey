const express = require('express');
const router = express.Router();
const {login, getUserById} = require("../db/controllers/auth");
const {authorizationUserMiddleware} = require("../middlewares/auth");
const pick = require("lodash/pick");

module.exports = () => {
    router.post("/login", (req, res, next) => {

        return login(req.body).then((data) => {
            return res.status(200).json(data);
        }).catch(err => next(err));

    });
    router.get("/auth", authorizationUserMiddleware , (req, res, next) => {

        return getUserById(req.user._id).then((data) => {
            return res.status(200).json(pick(data, ["_id", "name", "location", "role"]));
        }).catch(err => next(err));

    });
    return router;
};