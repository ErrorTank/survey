const express = require('express');
const router = express.Router();

module.exports = () => {
    router.use('/api/customer', require('./controllers/customer')());
    router.use('/api/auth', require('./controllers/auth')());
    return router;
};
