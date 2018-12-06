var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var GenreSchema = new Schema({
    id: { type: Number, required: true, index: { unique: true } },
    name: { type: String },
    picture: { type: String }
});

module.exports = mongoose.model('Genre', GenreSchema);