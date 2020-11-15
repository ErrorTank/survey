const express = require('express');
const router = express.Router();
const {authorizationUserMiddleware} = require("../middlewares/auth");
const { getAllServices,} = require("../db/controllers/service");

module.exports = () => {


    router.get("/all", authorizationUserMiddleware, (req, res, next) => {

        return getAllServices().then((data) => {
            return res.status(200).json(data);
        }).catch(err => next(err));

    });
    return router;
};