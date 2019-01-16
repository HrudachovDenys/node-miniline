const fs = require("fs");
const path = require("path");

class Autoload {
    static load(dirname, regex = /.*/g, replace = '') {
        const files = fs.readdirSync(path.join(dirname));
        const modules = {};

        files.forEach(file => {
            if (regex.test(file)) {
                let key = file;

                if (replace) {
                    key = key.replace(regex, replace);
                }
                modules[key] = require(path.join(dirname, file));
            }
        });

        return modules;
    }
}

module.exports = Autoload;