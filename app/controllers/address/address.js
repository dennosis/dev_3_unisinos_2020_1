const Address = require('../../models/address');

validate = async (data) => {

    const{
        cep,
        address,
        number,
        residentialComplement,
        neighborhood,
        city,
        uf

    } = data

    errors = {}

    if(cep == "" || cep == undefined)
        errors["cep"]="Empty cep"

    if(address == "" || address == undefined)
        errors["address"]="Empty address"

    if(number == "" || number == undefined)
        errors["number"]="Empty number"

    if(neighborhood == "" || neighborhood == undefined)
        errors["neighborhood"]="Empty neighborhood"

    if(city == "" || city == undefined)
        errors["city"]="Empty city"

    if(uf == "" || uf == undefined)
        errors["uf"]="Empty uf"

    return { errors }

}

create = async (data) => {
    
    const{
        cep,
        address,
        number,
        residentialComplement,
        neighborhood,
        city,
        uf,
        latitude,
        longitude
    } = data

    try{
        const address = await new Address({
            cep,
            address,
            number,
            residentialComplement,
            neighborhood,
            city,
            uf,
            latitude,
            longitude
        });
    
        await address.save();
    
        return address
    }catch(e){
        console.log(e)
        throw { message:"Error create address" }
    }
    
}

module.exports = {
    create,
    validate
};