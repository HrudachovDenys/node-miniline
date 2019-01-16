const mongoose = require("../utilities").MongooseUtility;
const Schema = mongoose.Schema;

const schema = new Schema({
    _id: Schema.Types.ObjectId,

    title: {
        type: String,
        unique: true,
        required: true
    },
    content: String,

    category_id: {
        type: Schema.Types.ObjectId, 
        ref: 'categories',
        auto: true
    },

    like_id: {
        type: Schema.Types.ObjectId,
        ref: 'likes',
        auto: true
    }
});

module.exports = mongoose.model("Post", schema);