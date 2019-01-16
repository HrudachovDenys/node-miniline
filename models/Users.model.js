const bcrypt = require("bcrypt");
const mongoose = require("../utilities").MongooseUtility;
const Schema = mongoose.Schema;

const schema = new Schema({
    _id: Schema.Types.ObjectId,

    username: {
        type: String,
        unique: true,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    regDate: {
        type: Date,
        default: Date.now
    },

    role_id: {
        type: Schema.Types.ObjectId, 
        ref: 'roles',
        auto: true
    }

});

schema.pre('save', function(next) {
    const user = this;

    bcrypt.hash(user.password, 10, (err, hash) => {
        if(err) return next(err);

        user.password = hash;

        next();
    });
});

schema.methods.comparePassword = function(password, callback) {

    bcrypt.compare(password, this.password, (err, res) => {
        if (err) return callback(err);

        callback(null, res);
    });
};

module.exports = mongoose.model("User", schema);