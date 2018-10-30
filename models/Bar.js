var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var barSchema = new mongoose.Schema({
  name: String,
  location: String,
  beers: [{type: mongoose.Schema.Types.ObjectId, ref: 'Beer'}]
},
{
  timestamps: true
});


module.exports = mongoose.model('Bar', barSchema);
