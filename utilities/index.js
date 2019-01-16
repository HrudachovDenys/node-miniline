const autoload = require("../Autoload");

module.exports = autoload.load(__dirname, /\.utility.js/g, "Utility");