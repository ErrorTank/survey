const express = require('express');
const router = express.Router();
const {authorizationUserMiddleware} = require("../middlewares/auth");
const {login, submitSurvey} = require("../db/controllers/main");

module.exports = () => {
    router.post("/login", (req, res, next) => {

        return login(req.body).then((data) => {
            return res.status(200).json(data);
        }).catch(err => next(err));

    });
    router.post("/submit-survey", authorizationUserMiddleware, (req, res, next) => {

        return submitSurvey(req.body).then((data) => {
            return res.status(200).json(data);
        }).catch(err => next(err));

    });
    return router;
};