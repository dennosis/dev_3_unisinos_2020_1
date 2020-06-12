const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let PaymentSchema = new Schema({
    isPaidOut: {
        type: Boolean
    },
    value: {
        type: Number
    },
    card: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Card'
    },
    billet: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Billet'
    }
});

module.exports = mongoose.model('Payment', PaymentSchema);