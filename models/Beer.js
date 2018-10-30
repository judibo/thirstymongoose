var mongoose = require('mongoose');

var Schema = mongoose.Schema;


var commentSchema = new Schema({
    content: String
}, {
    timestamps: true
});

var beerSchema = new Schema({
    name: String,
    style: String,
    bars: [{type: mongoose.Schema.Types.ObjectId, ref: 'Bar'}],
    comments: [commentSchema],
}, {
    timestamps: true
});

module.exports = mongoose.model('Beer', beerSchema);
