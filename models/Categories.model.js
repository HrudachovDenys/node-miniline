const mongoose = require("../utilities").MongooseUtility;
const Schema = mongoose.Schema;

const schema = new Schema({
    _id: Schema.Types.ObjectId,

    name: String
});

module.exports = mongoose.model("Category", schema);