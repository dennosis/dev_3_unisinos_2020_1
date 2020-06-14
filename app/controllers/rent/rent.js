const Rent = require('../../models/rent');
const User = require('../../models/user');
const Car = require('../../models/car');

module.exports = {
    create : async (req, res) => {
        const { userId } = req;
        
        let { rentalCompanyId, carId, datePickup, dateDelivery } = req.body;
        
        let totalAmount = await calculate(carId, datePickup, dateDelivery);
        
        const rent = await Rent.create({
            customer: userId,
            rentalCompany: rentalCompanyId,
            car: carId,
            datePickup, 
            dateDelivery,
            totalAmount: totalAmount
        });

        await rent.save();

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

    findById : async (req, res) => {
        const { id } = req.params;

        const rent = await Rent.findById(id)
            .populate("car")
            .populate("rentalCompany")
        
        return res.send(rent)
    },
}

let calculate = async (carId, datePickup, dateDelivery) => {
    const car = await Car.findById(carId);

    datePickup = new Date(datePickup);
    dateDelivery = new Date(dateDelivery);
    
    daysCount = (dateDelivery.getTime() - datePickup.getTime()) / (1000 * 3600 * 24);
    
    //(dias * cost) + (dias * security) + (adminTax)
    let totalAmount = 0;
    
    totalAmount += daysCount * parseFloat(car.cost.toString());
    totalAmount += daysCount * parseFloat(car.security.toString());
    totalAmount += parseFloat(car.adminTax.toString());
    
    return totalAmount;
}