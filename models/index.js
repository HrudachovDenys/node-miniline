const autoload = require("../Autoload");

module.exports = autoload.load(__dirname, /\.model.js/g, "Model");