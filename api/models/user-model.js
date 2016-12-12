var crypto = require('crypto');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// User
var User = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    hashedPassword: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});

// Шифруем пароль
User.methods.encryptPassword = function (password) {
    return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
};

User.virtual('userId')
    .get(function () {
        return this.id;
    });

// Аксессоры для пароля
User.virtual('password')
    .set(function (password) {
        this._plainPassword = password;
        this.salt = crypto.randomBytes(32).toString('base64');
        this.hashedPassword = this.encryptPassword(password);
    })
    .get(function () {
        return this._plainPassword;
    });

// Проверка пароля
User.methods.checkPassword = function (password) {
    return this.encryptPassword(password) === this.hashedPassword;
};

// Проверка на уникальность 'username'
User.path('username').validate(function (value, done) {
    this.model('User').count({username: value}, function (err, count) {
        if (err) {
            return done(err);
        }
        done(!count);
    });
}, 'username already exists');

var UserModel = mongoose.model('User', User);

module.exports = UserModel;