const mongoose = require("../utilities").MongooseUtility;
const Schema = mongoose.Schema;

const schema = new Schema({
    _id: Schema.Types.ObjectId,

    avatarUri: String,
    firstname: String,
    lastname: String,
    about: String,
    dateOfBidthday: Date,

    user_id: {
        type: Schema.Types.ObjectId, 
        ref: 'users',
        auto: true
    },
});

module.exports = mongoose.model("Profile", schema);