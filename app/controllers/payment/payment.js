const Payment = require('../../models/payment');
const Rent = require('../../models/rent');

module.exports = {
    payWithCard : async (req, res) =>{
        const { cardId, rentId } = req.body;
        
        let value = await getValue(rentId);

        const payment = await Payment.create({
            card: cardId, 
            rent: rentId,
            value: value
        })

        return res.send(convertToResponse(payment, true))
    },

    payWithBillet : async (req, res) =>{
        const { rentId } = req.body;
        
        let value = await getValue(rentId);

        const payment = await Payment.create({
            rent: rentId,
            value: value
        })

        return res.send(convertToResponse(payment, false))
    }  
}

let getValue = async (rentId) => {
    const rent = await Rent.findById(rentId);
    
    return parseFloat(rent.totalAmount.toString());
}


let convertToResponse = (payment, card) => {
    return {
        id: payment._id,
        message: card ? 'Pagamento realizado com sucesso!' : 'Pagamento aguardando confirmação.'
    }
}