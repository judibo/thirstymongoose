var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/thirsty-mongoose', {useNewUrlParser: true});

var db = mongoose.connection;
db.once('open', function() {
    console.log(`Connected do MongoDB at ${db.host}:${db.port}`);
});

db.on('error', function(err) {
    console.error(`Database error:\n${err}`);
});