const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const helmet = require("helmet");
const cors = require("cors");
const compression = require("compression");


module.exports = () => {
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json({
        limit: '2mb'
    }));
    app.use(cors({
        origin: process.env.HOST,
        optionsSuccessStatus: 200
    }));
    app.use(helmet());
    app.use(compression());
    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", process.env.HOST);
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, X-Requested-With, Content-Type, Accept, Authorization"
        );
        if (req.method === "OPTIONS") {
            res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
            return res.status(200).json({});
        }
        next();
    });
    app.use("/", (req, res, next) => {
        return express.static(process.cwd() + "/" + process.env.STATIC_DIR)(req, res, next)
    });

    return app;
};


