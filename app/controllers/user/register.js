const UserController = require('./user');
const UserInfoController = require('./userInfo');


register = async (req, res) => {
    try{

        let body = req.body
        let user = await UserController.create(body)

        let userInfo = await UserInfoController.create({user:user.data,...body}, true)

        if(userInfo.errors || user.errors){

            let errors = {...user.errors,...userInfo.errors}
            
            errors.user = undefined

            return res.status(406).send({
                errors, 
                message:"Error creating user"
            })

        }else{

            let tmpUser = {
                id:user.data._id,
                name:user.data.name, 
                email:user.data.email,
                cpf:userInfo.data.cpf,
                rg:userInfo.data.rg,
                cell:userInfo.data.cell,
                telephone:userInfo.data.telephone,
                cnhNumber:userInfo.data.cnhNumber,
                cnhValidate:userInfo.data.cnhValidate,
                cnhCategory:userInfo.data.cnhCategory
            }

            return res.send({
                user:tmpUser, 
                message:"Created user"
            });

        }

    }catch(err){
        console.log(err)
        return res.status(500).send({message:err.errmsg})
    }

}


module.exports = {
    register
};