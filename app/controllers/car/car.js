const Car = require('../../models/car');
const App = require('../../models/app');
const Rent = require('../../models/rent');

const AsyncUtils = require('../../../utils-module').Async;
const FiltterBuilderUtils = require('../../../utils-module').FiltterBuilder;

module.exports = {
    create : async (req, res) => {
        try {
            const { 
                name, apps, brand, model, manufactureYear, modelYear, cost, luggages, airConditioner, passengers,
                description, airBag, abs, kilometrage, board, currentRentalCompany, rentalCompanies, image, security, 
                adminTax, color
            } = req.body;
            
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
                passengers,
                description, 
                airBag, 
                abs,
                kilometrage,
                board,
                currentRentalCompany,
                rentalCompanies,
                image,
                security, 
                adminTax, 
                color
            })
            
            if(apps) {
                AsyncUtils.asyncForEach(apps, async (appId) => {
                    //add Car to App
                    const app = await App.findById(appId);
                    app.cars.push(car);
                    await app.save();
                });
            }            
            
            const populatedCar = 
                await Car.find({_id: car._id})
                    .populate("brand", 'name')
                    .populate("model", 'name')
                    .populate("apps", 'name')
                    .populate("currentRentalCompany", 'name')
                    .populate("rentalCompanies", 'name');
    
            return res.send(populatedCar)
        } catch (error) {
            console.log("error", error);
        }
    },

    list : async (req, res) => {
        const car = await Car.find()
            .populate("brand", 'name')
            .populate("model", 'name')
            .populate("apps", 'name')
            .populate("currentRentalCompany", 'name')
            .populate("rentalCompanies", 'name');
        
            return res.send(car)
    },

    getCar : async (req, res) => {
        const { id } = req.params;

        const car = await Car.findById(id)
            .populate("brand", 'name')
            .populate("model", 'name')
            .populate("apps", 'name')
            .populate("currentRentalCompany", 'name')
            .populate("rentalCompanies", 'name');

        res.send(car);
    },

    search : async (req, res) => {
        const { 
            name, apps, brand, model, manufactureYear, modelYear, cost, luggages, 
            airConditioner, passengers, airBag, abs, locationPickup, isAplicationCar, 
            dateInit, dateEnd, kilometrage, security, adminTax, color
        } = req.body;

        let filtters = {};
        
        //simple filtter
        if (name) { filtters.name = name}
        if (brand) { filtters.brand = brand}
        if (model) { filtters.model = model}
        if (luggages) { filtters.luggages = luggages}
        if (airConditioner) { filtters.airConditioner = airConditioner}
        if (airBag) { filtters.airBag = airBag}
        if (abs) { filtters.abs = abs}
        if (locationPickup) { filtters.currentRentalCompany = locationPickup}
        if (color) { filtters.color = color}

        //complex apps filtter
        if (apps) { filtters.apps = { $in: apps } }
        if (isAplicationCar) {                        
            let appIds = [];

            const apps = await App.find()
            apps.forEach(app => {
                appIds.push(app._id);
            });

            filtters.apps = { $in: appIds }
        }
        
        //complex data filtter
        if(dateInit && dateEnd) {
            let rentFiltters = [];
            
            rentFiltters.push({
                dateInit: {
                    $gte: dateInit,
                    $lte: dateEnd
                }
            })

            rentFiltters.push({
                dateEnd: {
                    $gte: dateInit,
                    $lte: dateEnd
                }
            })
            
            let rentedCards = [];

            const rents = await Rent.find({$or: rentFiltters})
            
            rents.forEach(rent => {
                rentedCards.push(rent.car);
            });
            
            
            if (rentedCards.length > 0) {
                filtters._id = { $nin: rentedCards }
            }            
        }

        //complex filtter
        if (manufactureYear) { filtters = FiltterBuilderUtils.build(manufactureYear, filtters, "manufactureYear") }
        if (modelYear) { filtters = FiltterBuilderUtils.build(modelYear, filtters, "modelYear") }
        if (cost) { filtters = FiltterBuilderUtils.build(cost, filtters, "cost") }
        if (passengers) { filtters = FiltterBuilderUtils.build(passengers, filtters, "passengers") }
        if (kilometrage) { filtters = FiltterBuilderUtils.build(kilometrage, filtters, "kilometrage") }
        if (security) { filtters = FiltterBuilderUtils.build(security, filtters, "security") }
        if (adminTax) { filtters = FiltterBuilderUtils.build(adminTax, filtters, "adminTax") }
        
        let cars = [];
        
        try {
            cars = await Car.find(filtters)
                .populate("brand", 'name')
                .populate("model", 'name')
                .populate("apps", 'name')
                .populate("currentRentalCompany", 'name')
                .populate("rentalCompanies", 'name');

        } catch (ex) {
            console.log(ex);
        }
        
        return res.send({cars: cars})
    }
}

