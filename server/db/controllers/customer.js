const mongoose = require('mongoose');
const dbManager = require('../index');
const appDb = dbManager.getConnections()[0];
const Survey = require('../model/survey')(appDb);
const Customer = require('../model/customer')(appDb);
const User = require('../model/user')(appDb);
const randomstring = require("randomstring");
const ObjectId = mongoose.Types.ObjectId;



const submitSurvey = (data) => {
    return new Survey(data).save()
}

const checkCustomer = data => {
    let {customerID} = data;
    return Customer.findOne({
        customerID: customerID.trim().toUpperCase()
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

const getSurveys = ({role, _id}, {keyword, sortBy = "createdAt", order = "desc", skip = 0, limit = 10, location, service, rating}) => {
    return (Number(role) === 0 ? Promise.resolve() : User.findOne({
        _id: Object(_id)
    }).lean())
        .then(user => {
            let pipelines = [];

            if(Number(role) === 1){
                pipelines.push({
                    $match: {
                        location: ObjectId(user.location._id)
                    },
                });
            }
            pipelines = pipelines.concat([
                {
                    $lookup: {
                        from: 'locations',
                        localField: 'location',
                        foreignField: '_id',
                        as: 'location',
                    },
                },{
                    $lookup: {
                        from: 'services',
                        localField: 'service',
                        foreignField: '_id',
                        as: 'service',
                    },
                },{
                    $lookup: {
                        from: 'customers',
                        localField: 'customer',
                        foreignField: '_id',
                        as: 'customer',
                    },
                },{
                    $addFields: {
                        'location': {
                            $arrayElemAt: ['$location', 0],
                        },
                        'service': {
                            $arrayElemAt: ['$service', 0],
                        },
                        'customer': {
                            $arrayElemAt: ['$customer', 0],
                        },
                    },
                },
            ]);

            if(keyword){
                pipelines.push({
                    $match: {
                        $or: [
                            {
                                phone: { $regex: keyword, $options: 'i' },

                            }, {
                                "customer.name": { $regex: keyword, $options: 'i' },

                            }, {
                                "customer.customerID": { $regex: keyword, $options: 'i' },
                            }
                        ]
                    },
                });
            }

            if(Number(rating) > 0){
                pipelines.push({
                    $match: {
                        rating: Number(rating)
                    },
                });
            }
            if(location !== '1'){
                pipelines.push({
                    $match: {
                        "location._id": ObjectId(location)
                    },
                });
            }
            if(service !== '1'){
                pipelines.push({
                    $match: {
                        "service._id": ObjectId(service)
                    },
                });
            }
            pipelines.push({
                $sort: {
                    [sortBy]: order === "desc" ? -1 : 1
                }
            },)
            return Survey.aggregate(pipelines).then(list => ({
                list: list.slice(Number(skip), Number(skip) + Number(limit)),
                total: list.length
            }))
        })

}

module.exports = {
    submitSurvey,
    checkCustomer,
    createCustomer,
    getSurveys
}