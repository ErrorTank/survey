const dbManager = require('../index');
const appDb = dbManager.getConnections()[0];
const Survey = require('../model/survey')(appDb);
const { createAuthToken } = require('../../lib/authentication/index');
const {
    getPrivateKey,
} = require('../../lib/authentication/keys/keys');

const login = (payload) => {
    return createAuthToken(payload, getPrivateKey(), {
        algorithm: 'RS256',
    }).then((token) => ({
        ...payload,
        token
    }))
}

const submitSurvey = (data) => {
    return new Survey(data).save()
}

module.exports = {
    login,
    submitSurvey
}