const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const surveySchema = new Schema({
    customer: {
        type: ObjectId,
        ref: "Customer"
    },
    rating: {
        type: Number,
        enum: [0, 1, 2, 3, 4]
    },
    text: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    service: {
        type: ObjectId,
        ref: "Service"
    },
    location: {
        type: ObjectId,
        ref: "Location"
    },
});
const autoPopulateParent = function(next){
    this.populate([
        {
            path: "location",
            model: "Location",
            select: "_id name"
        },
        {
            path: "service",
            model: "Service",
            select: "_id name"
        },
        {
            path: "customer",
            model: "Customer",
            select: "_id name phone customerID"
        },
    ]);
    next();
};
surveySchema.pre("find", autoPopulateParent).pre("findOne", autoPopulateParent).pre("findOneAndUpdate", autoPopulateParent);
surveySchema.post('save', function(doc, next) {
    doc.populate([
        {
            path: "location",
            model: "Location",
            select: "_id name"
        },
        {
            path: "service",
            model: "Service",
            select: "_id name"
        },
        {
            path: "customer",
            model: "Customer",
            select: "_id name phone customerID"
        },
    ]).execPopulate().then(function() {
        next();
    });
} );

module.exports = (db) => db.model("Survey", surveySchema);