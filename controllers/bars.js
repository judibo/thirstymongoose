var Bar = require('../models/Bar');
var Beer = require('../models/Beer');

module.exports = {
    index: function(req, res, next) {
        Bar.find({}, function(err, bars) {
            res.render('bars/index', {bars});
        });
    },
    new: function(req, res, next) {
        res.render('bars/new');
    },
    create: function(req,res, next) {
        var bar = new Bar(req.body);
        bar.save(err => {
            res.redirect(`/bars/${bar.id}`);
        });
    },
    show: function(req, res, next) {
        Bar.findById(req.params.id).populate('beers').exec(function(err, bar) {
            if (err) return next(err);
            Beer.find({}, function (err, beers) {
                res.render('bars/show', {bar, beers});
            })
        });
    },
    delete: function(req, res, next) {
        Bar.remove(req.params.id, function(err, bar) {
            if (err) return next(err);
            res.redirect('/bars');
        })
    },
    newServe: function(req, res, next) {
        Beer.find({bars: {$ne: req.params.id}})
          .exec(function(err, beers) {
            res.render('bars/serve', {
              beers,
              barId: req.params.id
            });
          });
    },
    createServe: function(req, res, next) {
        Bar.findById(req.params.barId, function(err, bar) {
            bar.beers.push(req.params.beerId);
            bar.save(() => {
                Beer.findById(req.params.beerId, (err, beer) => {
                    beer.bars.push(req.params.barId);
                    beer.save(() => {
                        res.redirect(`/bars/${bar.id}`);
                    });
                });
            });
        });
    },
    deleteServe: function(req, res, next) {
        Bar.findById(req.params.barId, (err, bar) => {
            bar.beers.remove(req.params.beerId);
            bar.save(() => {
                Beer.findById(req.params.beerId, (err, beer) => {
                    beer.bars.remove(req.params.barId);
                    beer.save(() => {
                        res.redirect(`/bars/${bar.id}`);
                    });
                });
            });
        });
    }
}