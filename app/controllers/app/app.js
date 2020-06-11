const App = require('../../models/app');

module.exports = {
    create : async (req, res) =>{
        const { name } = req.body;
        const app = await App.create({
            name
        })

        return res.send(app)
    },

    find : async (req, res) => {
        const app = await App.find()
        return res.send(app)
    },

    appsByCar : async (req, res) => {
        const { id } = req.params;
        const car = await App.findById(id).populate('apps');
 
         res.send(car.apps);
    },    

    test : async (req, res) => {
        const { userId } = req;
        console.log("userId", userId);

        res.send(["The Travellers IT","App","teste"]);
    }   
}