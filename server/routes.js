const express = require('express');
const router = express.Router();

module.exports = () => {
    router.use('/api', require('./controllers/main')());
    return router;
};
