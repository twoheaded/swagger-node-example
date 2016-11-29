'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bookSchema = new Schema({
    title:  String,
    author: String,
    year:   Number
});

var Book = mongoose.model('Book', bookSchema);

module.exports = Book;