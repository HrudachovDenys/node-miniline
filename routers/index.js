
const Autoload = require('../Autoload');

module.exports = Autoload.load(__dirname, /\.router.js$/g, 'Router');