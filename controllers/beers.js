var Beer = require('../models/Beer');

module.exports = {
    index: function(req, res, next) {
        Beer.find({}, function(err, beers) {
            res.render('beers/index', {beers});
        });
    },
    new: function(req, res, next) {
        res.render('beers/new');
    },
    create: function(req,res, next) {
        var beer = new Beer(req.body);
        beer.save(err => {
            res.redirect(`/beers/${beer.id}`);
        });
    },
    show: function(req, res, next) {
        Beer.findById(req.params.id).populate('bars').exec(function(err, beer) {
            if (err) return next(err);
            res.render('beers/show', {beer});
        });
    },
    delete: function(req, res, next) {
        Beer.findByIdAndRemove(req.params.id, function(err, beer) {
            if (err) return next(err);
            res.redirect('/beers', {beer});
        })
    },
    createComment: function(req, res, next) {
        Beer.findById(req.params.id).exec(function(err, beer) {
            beer.comments.push({content: req.body.content});
            beer.save(err => {
                res.redirect(`/beers/${beer.id}`);
            });
        })
    }
}