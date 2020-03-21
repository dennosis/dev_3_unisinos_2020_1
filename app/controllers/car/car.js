const Car = require('../../models/car');

module.exports = {
    create : async (req, res) =>{
        const { name } = req.body;
        const car = await Car.create({
            name
        })

        return res.send(car)
    },

    find : async (req, res) => {
        const car = await Car.find()
        return res.send(car)
    }
}