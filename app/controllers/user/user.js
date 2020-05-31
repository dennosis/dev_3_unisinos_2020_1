const User = require('../../models/user');


create = async (userData, isSave=false) => {

    const{ name, email, password } = userData;

    let filedsErrors = {}
    let checkEmail = true

    if(name == "" || name == undefined)
        filedsErrors["name"]="Empty Name"

    
    if(email == "" || email == undefined){
        filedsErrors["email"]="Empty email"
        
    }else if(await User.findOne({email})){
        filedsErrors["email"]="Email already exists"

    }

    if(password == "" || password == undefined)
        filedsErrors["password"]="Empty password"


    if(!(Object.keys(filedsErrors).length === 0)){

        return{
            errors:filedsErrors,
            message:"Error creating user"
        }

    }else{

        const user = await new User({
            name,
            email,
            password
        });
    
        if(isSave){
            await user.save();
        }

        return  { 
            data:user, 
            message:"Created user" 
        }
    }
}

createByReq = async (req, res) => {

    try{

        const {data, errors, message} = await create(req.body, true)

        if(data){

            return res.send(data);

        }else{
            return res.status(406).send({errors, message})
        }

    }catch(err){
        return res.status(500).send({message:err.errmsg})
    }
}


module.exports = {
    create,
    createByReq
};