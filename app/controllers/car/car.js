const Car = require('../../models/car');
const App = require('../../models/app');

module.exports = {
    create : async (req, res) =>{
        const { name, apps, brand, model } = req.body;
        const car = await Car.create({
            name,
            apps,
            brand,
            model,
            manufactureYear,
            modelYear
        })
        
        await asyncForEach(apps, async (appId) => {
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
    }    
}

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}