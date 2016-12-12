'use strict';
var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;
var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

var config = require('../../config/config');
var User = require('../models/user-model');

// Basic стратегия
passport.use(new BasicStrategy(
    function (username, password, done) {
        User.findOne({username: username}, function (err, user) {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false);
            }
            if (!user.checkPassword(password)) {
                return done(null, false);
            }
            return done(null, user);
        });
    }
));

// JWT стратегия
var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
opts.secretOrKey = config.jwt.secret;

passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
    User.findOne({username: jwt_payload.username}, function (err, user) {
        if (err) {
            return done(err);
        }
        if (!user) {
            return done(null, false);
        }
        return done(null, user);
    });
}));

module.exports = passport;