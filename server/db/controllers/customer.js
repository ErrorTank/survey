
const dbManager = require('../index');
const appDb = dbManager.getConnections()[0];
const Survey = require('../model/survey')(appDb);
const Customer = require('../model/customer')(appDb);
const randomstring = require("randomstring");
const { createAuthToken } = require('../../lib/authentication/index');
const {
    getPrivateKey,
} = require('../../lib/authentication/keys/keys');



const submitSurvey = (data) => {
    return new Survey(data).save()
}

const checkCustomer = data => {
    let {customerID} = data;
    return Customer.findOne({
        customerID: customerID.trim().toLowerCase()
    })
        .lean()
        .then(customer => {
            return customer;
        })
}

const createCustomer = data => {
    let {name, phone} = data;
    const customerID = randomstring.generate(5).toUpperCase();
    return new Customer({name: name.trim(), phone: phone.trim(), customerID}).save()
}

module.exports = {
    submitSurvey,
    checkCustomer,
    createCustomer
}