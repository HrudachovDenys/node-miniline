const mongoose = require("../utilities").MongooseUtility;
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const schema = new Schema({
    _id: Schema.Types.ObjectId,

    token: String,
    user_id: {
        type: Schema.Types.ObjectId, 
        ref: 'users',
        auto: true
    },
    expiries: {
        type: Date,
        default: new Date(+new Date() + 7*24*60*60*1000)
    }
});

schema.pre('save', function(next) {
    const token = this;

    bcrypt.hash(token.user_id, 10, (err, hash) => {
        if(err) return next(err);

        console.log(hash);
        token.token = hash;

        next();
    });
});

module.exports = mongoose.model("Token", schema);