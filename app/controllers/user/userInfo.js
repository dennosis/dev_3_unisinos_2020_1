const UserInfo = require('../../models/userInfo');
const User = require('../../models/user');

create = async (userData, isSave=false) => {

    const{
        user,
        cpf,
        rg,
        cellphone,
        phone,
        cnhNumber,
        cnhExpirationDate,
        cnhCategory,
        cep,
        address,
        number,
        residentialComplement,
        neighborhood,
        city,
        uf

    } = userData

    filedsErrors = {}

    if(user == "" || user == undefined)
        filedsErrors["user"]="Empty user"

    if(cpf == "" || cpf == undefined){
        filedsErrors["cpf"]="Empty cpf"
    }else if(await UserInfo.findOne({cpf})){
        filedsErrors["cpf"]="Cpf already exists"
    }

    if(rg == "" || rg == undefined)
        filedsErrors["rg"]="Empty rg"

    if(cellphone == "" || cellphone == undefined)
        filedsErrors["cellphone"]="Empty cellphone"

    if(cnhNumber == "" || cnhNumber == undefined){
        filedsErrors["cnhNumber"]="Empty cnhNumber"
    }else if(await UserInfo.findOne({cnhNumber})){
        filedsErrors["cnhNumber"]="CnhNumber already exists"
    }
        
    if(cnhExpirationDate == "" || cnhExpirationDate == undefined)
        filedsErrors["cnhExpirationDate"]="Empty cnhExpirationDate"

    if(cnhCategory == "" || cnhCategory == undefined)
        filedsErrors["cnhCategory"]="Empty cnhCategory"

    if(cep == "" || cep == undefined)
        filedsErrors["cep"]="Empty cep"


    if(address == "" || address == undefined)
        filedsErrors["address"]="Empty address"

    if(number == "" || number == undefined)
        filedsErrors["address"]="Empty address"

    if(neighborhood == "" || neighborhood == undefined)
        filedsErrors["neighborhood"]="Empty neighborhood"

    if(city == "" || city == undefined)
        filedsErrors["city"]="Empty city"

    if(uf == "" || uf == undefined)
        filedsErrors["uf"]="Empty uf"

    if(!(Object.keys(filedsErrors).length === 0)){
        return{
            errors:filedsErrors,
            message:"Error creating user infos"
        }

    }else{

        const userInfo = await new UserInfo({
            user,
            cpf,
            rg,
            cellphone,
            phone,
            cnhNumber,
            cnhExpirationDate,
            cnhCategory,
            cep,
            address,
            number,
            residentialComplement,
            neighborhood,
            city,
            uf    
        });

        if(isSave){
            await User.create(user)
            await userInfo.save();
        }
        return  { 
            data:userInfo, 
            message:"Created user infos" 
        }
    }
}

module.exports = {
    create
};