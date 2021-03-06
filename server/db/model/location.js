const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const locationSchema = new Schema({
    name: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});

module.exports = (db) => db.model("Location", locationSchema);