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

        let response = [];
        
        companies.forEach(company => {
            response.push(convertToResponse(company))
        });

        return res.send(response)
    },

    findById : async (req, res) => {
        const { id } = req.params;
        
        const company = await RentalCompany.findById(id)
            .populate('address');
 
        res.send(convertToResponse(company));
    }
}

let convertToResponse = (company) => {
    return {
        id: company._id,
        name: company.name,
        cellphone: company.cellphone,
        phone: company.phone,
        email: company.email,
        cep: (company.address) ? company.address.cep : '',
        address: (company.address) ? company.address.address : '',
        number: (company.address) ? company.address.number : '',
        residentialComplement: (company.address) ? company.address.residentialComplement : '',
        neighborhood: (company.address) ? company.address.neighborhood : '',
        city: (company.address) ? company.address.city : '',
        uf: (company.address) ? company.address.uf : '',
        latitude: (company.address) ? company.address.latitude : '',
        longitude: (company.address) ? company.address.longitude : '',
    }
}