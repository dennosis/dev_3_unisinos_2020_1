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
    dateInit: {
        type: Date,
        required: true
    },
    dateEnd: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('Rent', RentSchema);