const autoload = require("../Autoload");

module.exports = autoload.load(__dirname, /\.middleware.js/g, "Middleware");