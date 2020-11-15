const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const userSchema = new Schema({
    name: {
        type: String,
    },
    username: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
    role: {
        type: Number,
        enum: [0, 1, 2]
    },
    location: {
        type: ObjectId,
        ref: "Location"
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});

const autoPopulateParent = function(next){
    this.populate([
        {
            path: "location",
            model: "Location",
            select: "_id name"
        },
    ]);
    next();
};
userSchema.pre("find", autoPopulateParent).pre("findOne", autoPopulateParent).pre("findOneAndUpdate", autoPopulateParent);
userSchema.post('save', function(doc, next) {
    doc.populate([
        {
            path: "location",
            model: "Location",
            select: "_id name"
        },
    ]).execPopulate().then(function() {
        next();
    });
} );

module.exports = (db) => db.model("UserSpa", userSchema);