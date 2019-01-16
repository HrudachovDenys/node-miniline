const autoload = require("../Autoload");

module.exports = autoload.load(__dirname, /\.controller.js/g, "Controller");