const mongoose = require('mongoose');
const dbManager = require('../index');
const appDb = dbManager.getConnections()[0];
const User = require('../model/user')(appDb);
const { ApplicationError } = require('../../lib/error/error-types');
const { createAuthToken } = require('../../lib/authentication/index');
const pick = require("lodash/pick");
const {
    getPrivateKey,
} = require('../../lib/authentication/keys/keys');
const ObjectId = mongoose.Types.ObjectId;


const login = ({username, password}) => {
    return User.findOne({
        username,
        password
    }).lean()
        .then((user) => {
            if(!user){
                return Promise.reject(new ApplicationError('wrong_credential'));
            }
            return createAuthToken(pick(user, ['_id', 'name', 'role']), getPrivateKey(), {
                algorithm: 'RS256',
            }).then((token) => {
                return {
                    token,
                    user: {
                        ...pick(user, ["_id", "name", "location", "role"])
                    },
                };
            });
        })
}

const getUserById = (userID) => {
    return User.findOne({
        _id: ObjectId(userID)
    }).lean()
}

module.exports = {
    login,
    getUserById
}