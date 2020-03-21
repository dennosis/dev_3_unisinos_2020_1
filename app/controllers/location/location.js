const Location = require('../../models/location');
const User = require('../../models/user');
const Car = require('../../models/car');

module.exports = {
    create : async (req, res) => {
        
        const { customer, car } = req.body;
        
        let { status } = req.body;
        if(status === undefined) {
            status = "PROPOSAL"
        }

        const location = await Location.create({
            status,
            customer,
            car
        });

        await location.save();

        //add Location to User
        const relatedUser = await User.findById(customer);
        relatedUser.locations.push(location);
        await relatedUser.save();

        //add Location to Car
        const relatedCar = await Car.findById(car);
        relatedCar.locations.push(location);
        await relatedCar.save();

        return res.send(location);
    }
}