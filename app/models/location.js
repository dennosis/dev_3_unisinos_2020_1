const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let LocationSchema = new Schema({
    status: {
        type: String, 
        required: true
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    car: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Car'
    }
});

module.exports = mongoose.model('Location', LocationSchema);