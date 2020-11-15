const express = require('express');
const router = express.Router();

module.exports = () => {
    router.use('/api/customer', require('./controllers/customer')());
    router.use('/api/auth', require('./controllers/auth')());
    router.use('/api/location', require('./controllers/location')());
    router.use('/api/service', require('./controllers/service')());
    return router;
};
