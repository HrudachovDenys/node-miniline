const mongoose = require("mongoose");
const config = require("../config");

mongoose.connect(config.get("mongoose:uri"), (err) => {
    if(err) throw err;
});

module.exports = mongoose;