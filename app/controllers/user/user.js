const User = require('../../models/user');

validate = async (data) => {

    const{ 
        name, 
        email, 
        password 
    } = data

    let errors = {}

    if(name == "" || name == undefined)
        errors["name"]="Empty Name"

    if(email == "" || email == undefined){
        errors["email"]="Empty email"
        
    }else if(await User.findOne({email})){
        errors["email"]="Email already exists"
    }

    if(password == "" || password == undefined)
        errors["password"]="Empty password"

    return { errors }
}

create = async (data) => {
    try{
        const{ 
            name, 
            email, 
            password 
        } = data

        const user = await new User({
            name,
            email,
            password
        });

        await user.save();
        
        return user  
    
    }catch(e){
        console.log(e)
        throw { message:"Error create user" }
    } 
}

createByReq = async (req, res) => {

    try{
        const errors = validate(req.body).errors

        if(Object.keys(errors).length === 0)
            return res.status(406).send({
                errors, 
                message:"Error create user"            
            })

        const user = create(req.body)
        
        return res.send({
            user,
            message:"Created user"
        })

    }catch(e){
        return res.status(500).send(e)
    }

}

module.exports = {
    create,
    createByReq,
    validate
};