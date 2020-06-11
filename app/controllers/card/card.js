const Card = require('../../models/card');
const User = require('../../models/user');

//const validateUtil = require('../../../utils-module').validateUtil;

module.exports = {
    create : async (req, res) =>{
        try {
            const { userId } = req;
        
            const { cardNumber, name, expirationMonth, expirationYear, document } = req.body;
            
            const card = await Card.create({
                cardNumber, 
                name, 
                expirationMonth, 
                expirationYear, 
                document, 
                userId
            });

            const relatedUser = await User.findById(userId);
            
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
        const { userId } = req;
        
        const relatedUser = await User.findById(userId)
            .populate('cards');

        
        res.send({cards: relatedUser.cards});
    },

    findCardById : async (req, res) => {
        const { id } = req.params;
        
        const card = await Card.findById(id);
        
        res.send(card);
    }
}