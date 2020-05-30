const Car = require('../../models/car');
const App = require('../../models/app');
const AsyncUtils = require('../../../utils-module').Async;
const FiltterBuilderUtils = require('../../../utils-module').FiltterBuilder;

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
        const { name, apps, brand, model, manufactureYear, modelYear, cost, luggages, airConditioner, passengers } = req.body;

        let filtters = {};
        
        //simple filtter
        if (name) { filtters.name = name}
        if (brand) { filtters.brand = brand}
        if (model) { filtters.model = model}
        if (luggages) { filtters.luggages = luggages}
        if (airConditioner) { filtters.airConditioner = airConditioner}

        //complex apps filtter
        if (apps) { filtters.apps = { $in: apps } }

        //complex filtter
        if (manufactureYear) { filtters = FiltterBuilderUtils.build(manufactureYear, filtters, "manufactureYear") }
        if (modelYear) { filtters = FiltterBuilderUtils.build(modelYear, filtters, "modelYear") }
        if (cost) { filtters = FiltterBuilderUtils.build(cost, filtters, "cost") }
        if (passengers) { filtters.passengers = passengers}
        
        let cars = [];
        
        try {
            cars = await Car.find(filtters)
        } catch (ex) {
            console.log(ex);
        }
        
        return res.send(cars)
    }
}

