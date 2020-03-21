const Car = require('../../models/car');

exports.car_create = function (req, res) {
    let car = new Car(
        {
            name: req.body.name,
            price: req.body.price
        }
    );

    car.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send('Car Created successfully')
    })
};

exports.car_details = function (req, res) {
    Car.findById(req.params.id, function (err, car) {
        if (err) return next(err);
        res.send(car);
    })
};

exports.car_update = function (req, res) {
    Car.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, car) {
        if (err) return next(err);
        res.send('Car udpated.');
    });
};

exports.car_delete = function (req, res) {
    Car.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.send('Car deleted successfully!');
    })
};