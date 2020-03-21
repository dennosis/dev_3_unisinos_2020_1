const Model = require('../../models/model');
const Brand = require('../../models/brand');

module.exports = {
    create : async (req, res) => {

        console.log(req.params);
        brand = req.params;
        id = brand.id;
        const { name } = req.body;
        const model = await Model.create({
            name,
            brand:id
        });
        await model.save();

        const brandById = await Brand.findById(id);

        brandById.models.push(model);
        await brandById.save();

        return res.send(brandById);
    },

    brandByModel : async (req,res)=>{
        const { id } = req.params;
        const brandByModel = await Model.findById(id).populate('brand');
        res.send(brandByModel);
    }
}