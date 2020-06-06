const Card = require('../../models/card');
const User = require('../../models/user');

//const validateUtil = require('../../../utils-module').validateUtil;

module.exports = {
    create : async (req, res) =>{
        try {
            let user = req.params.id;
        
            const { cardNumber, name, expirationMonth, expirationYear, document } = req.body;
            
            const card = await Card.create({
                cardNumber, 
                name, 
                expirationMonth, 
                expirationYear, 
                document, 
                user
            });

            const relatedUser = await User.findById(user);
            
            if(relatedUser) {
                relatedUser.cards.push(card);
                await relatedUser.save();
            }     

            return res.send(card);
        } catch (error) {
            console.log(error);
        }
    },

    findCardsByUser : async (req, res) => {
        let userId = req.params.id;

        const relatedUser = await User.findById(userId)
            .populate('cards');

        res.send(relatedUser.cards);

        res.send(cards);
    }
}