const Car = require('../../models/car');
const App = require('../../models/app');
const AsyncUtils = require('../../../utils-module').Async;

module.exports = {
    create : async (req, res) =>{
        const { name, apps, brand, model, manufactureYear, modelYear, cost, luggages, airConditioner, passengers } = req.body;
        const car = await Car.create({
            name,
            apps,
            brand,
            model,
            manufactureYear,
            modelYear,
            cost, 
            luggages, 
            airConditioner, 
            passengers
        })
        
        AsyncUtils.asyncForEach(apps, async (appId) => {
            //add Car to App
            const app = await App.findById(appId);
            app.cars.push(car);
            await app.save();
        });

        return res.send(car)
    },

    find : async (req, res) => {
        const car = await Car.find()
        return res.send(car)
    },

    search : async (req, res) => {
        const { manufactureYear, modelYear } = req.body;

        let filtters = {};
        if (manufactureYear) { filtters.manufactureYear = manufactureYear}
        if (modelYear) { filtters.modelYear = modelYear}
        
        const cars = await Car.find(filtters)
        
        return res.send(cars)
    }
}