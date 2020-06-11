const Rent = require('../../models/rent');
const User = require('../../models/user');
const Car = require('../../models/car');

module.exports = {
    create : async (req, res) => {
        const { userId } = req;
        
        let { car, status } = req.body;
        
        if(status === undefined) {
            status = "PROPOSAL"
        }

        const rent = await Rent.create({
            status,
            customer: userId,
            car
        });

        await rent.save();

        //add Rent to User
        console.log("userId", userId);
        
        const relatedUser = await User.findById(userId);
        relatedUser.rents.push(rent);
        await relatedUser.save();

        //add Rent to Car
        const relatedCar = await Car.findById(car);
        relatedCar.rents.push(rent);
        await relatedCar.save();

        return res.send(rent);
    }
}