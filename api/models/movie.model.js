var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var MovieSchema = new Schema({
    id: { type: Number, required: true, index: { unique: true } },
    adult: { type: Boolean },
    backdrop_path: { type: String },
    genre_ids: [
        { type: Number }
    ],
    original_language: { type: String },
    original_title: { type: String },
    overview: { type: String },
    poster_path: { type: String },
    release_date: { type: String },
    title: { type: String },
    video: { type: Boolean },
    vote_average: { type: Number },
    vote_count: { type: Number },
    popularity: { type: Number }
});

MovieSchema.pre('save', function(next) {
    var movie = this;

    // override the poster path
    movie.poster_path = `https://image.tmdb.org/t/p/w200_and_h300_bestv2${movie.poster_path}`;
    next();
});

module.exports = mongoose.model('Movie', MovieSchema);