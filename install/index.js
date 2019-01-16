const async = require('async');
const config = require('./config.json');
const mongoose = require("../utilities").MongooseUtility;

const {
    UsersModel,
    RolesModel
} = require('../models');

async.series([
    open,
    dropDB,
    initRoles,
    createAdmin,
    close
], (err, res) => {
    if(err) console.log(err);
    else console.log(res);
})

function open(callback){
    mongoose.connection.once("open", callback);
}

function dropDB(callback){
    const db = mongoose.connection.db;
    db.dropDatabase(callback);
}

function initRoles(callback) {
    const roles = [
        { _id: new mongoose.Types.ObjectId(), name: "admin", codename: 0 },
        { _id: new mongoose.Types.ObjectId(), name: "moderator", codename: 1 },
        { _id: new mongoose.Types.ObjectId(), name: "user", codename: 2 },
        { _id: new mongoose.Types.ObjectId(), name: "unconfirmed", codename: 3 },
        { _id: new mongoose.Types.ObjectId(), name: "blocked", codename: 4 }
    ];

    async.each(roles, (data, callback) => {
        let role = new RolesModel(data);

        role.save((err) => {
            callback(err, role);
        });
    }, callback);
}

function createAdmin(callback) {
    RolesModel.findOne({ 'name':'admin' })
        .exec((err, role) => {
            if (err) return console.log(err);
            
            const admin = { 
                _id: new mongoose.Types.ObjectId(),
                username: config.admin, 
                password: config.password,
                email: config.email,
                role_id: role._id
            };

            const model = new UsersModel(admin);
            model.save((err) => {
                callback(err, 'Admin is created!');
            });
        });
}

function close(callback){
    mongoose.disconnect(callback);
}