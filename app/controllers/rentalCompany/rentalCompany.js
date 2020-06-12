const RentalCompany = require('../../models/rentalCompany');

module.exports = {
    create : async (req, res) =>{
        const { name, cellphone, phone, email } = req.body;
        
        const company = await RentalCompany.create({
            name,
            cellphone,
            phone,
            email
        })

        return res.send(company)
    },

    find : async (req, res) => {
        const companies = await RentalCompany.find()
        return res.send(companies)
    },

    findById : async (req, res) => {
        const { id } = req.params;
        
        const company = await RentalCompany.findById(id);
 
        res.send(company);
    }
}