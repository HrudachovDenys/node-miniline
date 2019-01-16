const async = require('async');
const mongoose = require('mongoose');
const config = require('../config');
const jwt = require('jsonwebtoken');

const {
    JsonWebTokenHelper
} = require('../helpers')

const {
    UsersModel,
    RolesModel,
    TokensModel
} = require('../models');

class ApiController {

    static async LoginAction(req, res, next) {

        UsersModel.findOne({ 'username': req.body.username }, (err, user) => {
            if(err || !user) {
                res.status(401).send('Unauthorized');
            } else {
                user.comparePassword(req.body.password, (err, isPass) => {
                    if(err || !isPass) {
                        res.status(401).send('Unauthorized');
                    } else {
                        const token = JsonWebTokenHelper.generateToken(user.toJSON());
                        res.status(200).send({
                            token: token
                        });
                    }
                });
            }
        });    
    }

    static async RegistrationAction(req, res, next) {
        
        RolesModel.findOne({ 'name':'unconfirmed' })
            .exec((err, role) => {
                if (err) return console.log(err);
                
                const user = { 
                    _id: new mongoose.Types.ObjectId(),
                    username: req.body.username, 
                    password: req.body.password,
                    email: req.body.email,
                    role_id: role._id
                };

                const model = new UsersModel(user);
                model.save((err) => {
                    if(err) {
                        res.status(406).send('User already exists');
                    } else {
                        res.status(200).send({
                            message: 'Success!'
                        });
                    }
                });
            });

    }

    static async VerificationTokenAction(req, res, next) {

        jwt.verify(req.body.token, config.get('token:secret'), (err) => {
            if(err) {
                res.status(200).send({
                    isAuth: false
                })
            } else {
                res.status(200).send({
                    isAuth: true
                })
            }
        });
    }
}

module.exports = ApiController;