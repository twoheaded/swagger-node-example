'use strict';

module.exports = {
    getAll: getAll
};

function getAll(req, res, next) {

    res.json([
        {
            "id": "324sd903w4rfa034jaf",
            "title": "Live whit swagger",
            "author": "Paabrew",
            "year": 2016
        },

        {
            "id": "324s53w4rfa0sd34jaf",
            "title": "Ololol authentication",
            "author": "Swagger Node",
            "year": 2016
        }
    ]);
}