const UserController = require('../user/user');
const UserInfoController = require('../userInfo/userInfo');
const AddressController = require('../address/address');
const UserInfo = require('../../models/userInfo');

register = async (req, res) => {

    const data = req.body

    const userErrors = await UserController.validate(data)
    const userInfoErrors = await UserInfoController.validate(data)
    const addressErrors = await AddressController.validate(data)
    const errors = {...userErrors.errors, ...userInfoErrors.errors, ...addressErrors.errors}
    
    if(Object.keys(errors).length > 0)
        return res.status(406).send({
            errors, 
            message:"Error register user"
        })

    try{
        const user = await UserController.create(data)
        const address = await AddressController.create(data)
        const userInfo = await UserInfoController.create({...data,user,address})

        return await res.send({
            id:user._id,
            name:user.name,
            email:user.email,
            cpf:userInfo.cpf,
            rg:userInfo.rg,
            cellphone:userInfo.cellphone,
            phone:userInfo.phone,
            cnhNumber:userInfo.cnhNumber,
            cnhExpirationDate:userInfo.cnhExpirationDate,
            cnhCategory:userInfo.cnhCategory
        });

    }catch(err){
        console.log(err)
        return res.status(500).send(err)
    }
}

getUser = async (req, res) => {
    const { userId } = req;
    const userInfo = await UserInfo
                        .findOne({user:userId})
                        .populate("user")
                        .populate("address")
                        
    return res.send({
        id:userInfo.user._id,
        email: userInfo.user.email,
        name: userInfo.user.name,
        cpf: userInfo.cpf,
        rg: userInfo.rg,
        phone: userInfo.phone,
        cellphone: userInfo.cellphone,
        cnhNumber: userInfo.cnhNumber,
        cnhCategory: userInfo.cnhCategory,
        cnhExpirationDate: userInfo.cnhExpirationDate,
        uf:userInfo.address.uf,
        city:userInfo.address.city,
        cep: userInfo.address.cep,
        address: userInfo.address.address,
        residentialComplement: userInfo.address.residentialComplement,
        neighborhood: userInfo.address.neighborhood,
        number: userInfo.address.number
    })
}

module.exports = {
    register,
    getUser
};