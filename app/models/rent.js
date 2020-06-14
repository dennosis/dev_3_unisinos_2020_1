const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let RentSchema = new Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    car: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Car'
    },
    rentalCompany: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'RentalCompany'
    },
    datePickup: {
        type: Date,
        required: true
    },
    dateDelivery: {
        type: Date,
        required: true
    },
    totalAmount: {
        type: mongoose.Decimal128,
        required: true
    },
});

module.exports = mongoose.model('Rent', RentSchema);