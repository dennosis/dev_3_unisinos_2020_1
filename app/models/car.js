const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let CarSchema = new Schema({
    name: {
        type: String, 
        required: true
    },
    brand: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Brand',
        required: true
    },
    model: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Model',
        required: true
    },
    manufactureYear: {
        type: Number,
        required: true
    },
    modelYear: {
        type: Number,
        required: true
    },
    apps : [
        {
            type: mongoose.Schema.Types.ObjectId, 
            ref:'App'
        }
    ],
    locations : [
        {
            type: mongoose.Schema.Types.ObjectId, 
            ref:'Location'
        }
    ]
});


// Export the model
module.exports = mongoose.model('Car', CarSchema);