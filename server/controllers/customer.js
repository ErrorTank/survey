const express = require('express');
const router = express.Router();
const {authorizationUserMiddleware} = require("../middlewares/auth");
const { submitSurvey, checkCustomer, createCustomer} = require("../db/controllers/customer");

module.exports = () => {

    router.post("/create-customer",authorizationUserMiddleware, (req, res, next) => {

        return createCustomer(req.body).then((data) => {
            return res.status(200).json(data);
        }).catch(err => next(err));

    });
    router.post("/check-customer", authorizationUserMiddleware, (req, res, next) => {

        return checkCustomer(req.body).then((data) => {
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