const RentalCompany = require('../../models/rentalCompany');
const AddressController = require('../address/address');

module.exports = {
    create : async (req, res) =>{
        const data = req.body

        const address = await AddressController.create(data)

        const { name, cellphone, phone, email } = data;
        
        const company = await RentalCompany.create({
            name,
            cellphone,
            phone,
            email,
            address
        })

        return res.send(company)
    },

    find : async (req, res) => {
        const companies = await RentalCompany.find()
            .populate('address')

        return res.send(companies)
    },

    findById : async (req, res) => {
        const { id } = req.params;
        
        const company = await RentalCompany.findById(id)
            .populate('address');
 
        res.send(company);
    }
}