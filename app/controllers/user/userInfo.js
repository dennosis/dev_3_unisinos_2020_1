const UserInfo = require('../../models/userInfo');
const User = require('../../models/user');


create = async (userData, isSave=false) => {

    const{
        user,
        cpf,
        rg,
        cell,
        telephone,
        cnhNumber,
        cnhValidate,
        cnhCategory
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

    if(cell == "" || cell == undefined)
        filedsErrors["cell"]="Empty cell"

    if(cnhNumber == "" || cnhNumber == undefined){
        filedsErrors["cnhNumber"]="Empty cnhNumber"
    }else if(await UserInfo.findOne({cnhNumber})){
        filedsErrors["cnhNumber"]="CnhNumber already exists"
    }
        
    if(cnhValidate == "" || cnhValidate == undefined)
        filedsErrors["cnhValidate"]="Empty cnhValidate"

    if(cnhCategory == "" || cnhCategory == undefined)
        filedsErrors["cnhCategory"]="Empty cnhCategory"

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
            cell,
            telephone,
            cnhNumber,
            cnhValidate,
            cnhCategory
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