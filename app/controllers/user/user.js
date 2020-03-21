const User = require('../../models/user');

module.exports = {
    create : async (req, res) => {
        const { name, email, password } = req.body;
        
        const user = await User.create({
            name,
            email,
            password
        });

        await user.save();

        return res.send(user);
    }
}