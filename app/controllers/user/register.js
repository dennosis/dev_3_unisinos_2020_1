const UserController = require('./user');
const UserInfoController = require('./userInfo');
const AddressController = require('./address');

register = async (req, res) => {

    try{

        const data = req.body

        const userErrors = UserController.validate(data).errors
        const userInfoErrors = UserInfoController.validate(data).errors
        const addressErrors = AddressController.validate(data).errors
        const errors = {...userErrors, ...userInfoErrors, ...addressErrors}
        
        if(Object.keys(errors).length > 0)
            return res.status(406).send({
                errors, 
                message:"Error register user"
            })
        
        const user = await UserController.create(data)
        const address = await AddressController.create(data)
        const userInfo = await UserInfoController.create({user,address,...data})

        return res.send({
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


module.exports = {
    register
};