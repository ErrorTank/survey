const express = require('express');
const router = express.Router();
const {authorizationUserMiddleware} = require("../middlewares/auth");
const { getAllLocations,} = require("../db/controllers/location");

module.exports = () => {


    router.get("/all", authorizationUserMiddleware, (req, res, next) => {

        return getAllLocations().then((data) => {
            return res.status(200).json(data);
        }).catch(err => next(err));

    });
    return router;
};