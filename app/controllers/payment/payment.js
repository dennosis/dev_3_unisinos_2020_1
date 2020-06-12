const Payment = require('../../models/payment');

module.exports = {
    payWithCard : async (req, res) =>{
        const { cardId, rentId } = req.body;
        
        const payment = await Payment.create({
            card: cardId, 
            rent: rentId
        })

        return res.send(payment)
    },

    payWithBillet : async (req, res) =>{
        const { rentId } = req.body;
        
        const payment = await Payment.create({
            rent: rentId
        })

        return res.send(payment)
    }  
}