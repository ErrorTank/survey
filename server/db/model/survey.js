const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const surveySchema = new Schema({
    customerID: String,
    rating: Number,
    text: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = (db) => db.model("Survey", surveySchema);