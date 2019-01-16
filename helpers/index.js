const autoload = require("../Autoload");

module.exports = autoload.load(__dirname, /\.helper.js/g, "Helper");