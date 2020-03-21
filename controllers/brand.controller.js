const Brand = require('../models/brand.model');

//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Greetings from the Test controller!');
};

exports.brand_create = function (req, res) {
    let brand = new Brand(
        {
            name: req.body.name
        }
    );

    brand.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send('Brand Created successfully')
    })
};

exports.brand_details = function (req, res) {
    Brand.findById(req.params.id, function (err, brand) {
        if (err) return next(err);
        res.send(brand);
    })
};

exports.brand_update = function (req, res) {
    Brand.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, brand) {
        if (err) return next(err);
        res.send('Brand udpated.');
    });
};

exports.brand_delete = function (req, res) {
    Brand.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.send('Brand deleted successfully!');
    })
};