const Brand = require('../../models/brand');

module.exports = {
    create : async (req, res) =>{
        const { name } = req.body;
        const brand = await Brand.create({
            name
        })

        return res.send(brand)
    },

    find : async (req, res) => {
        const brand = await Brand.find()
        return res.send(brand)
    },
    
    modelsByBrand : async (req, res) => {
       const { id } = req.params;
       const brand = await Brand.findById(id).populate('models');

        res.send(brand.models);
    }
}