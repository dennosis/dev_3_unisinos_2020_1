const Rent = require('../../models/rent');
const User = require('../../models/user');
const Car = require('../../models/car');

module.exports = {
    create : async (req, res) => {
        const { userId } = req;
        
        let { rentalCompanyId, carId, dateInit, dateEnd } = req.body;
        
        const rent = await Rent.create({
            customer: userId,
            rentalCompany: rentalCompanyId,
            car: carId,
            dateInit, 
            dateEnd
        });

        await rent.save();

        //add Rent to User
        console.log("userId", userId);
        
        const relatedUser = await User.findById(userId);
        relatedUser.rents.push(rent);
        await relatedUser.save();

        //add Rent to Car
        const relatedCar = await Car.findById(carId);
        relatedCar.rents.push(rent);
        await relatedCar.save();

        return res.send(rent);
    },

    find : async (req, res) => {
        const { userId } = req;

        const rents = await Rent.find({customer: userId})
            .populate("car")
            .populate("rentalCompany")
        
        return res.send({rents: rents})
    },
}