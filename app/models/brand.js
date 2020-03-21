const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let BrandSchema = new Schema({
    name: {type: String, required: true, max: 100},
    models : [
        {type: mongoose.Schema.Types.ObjectId, ref:'Model'}
    ]
});


// Export the model
module.exports = mongoose.model('Brand', BrandSchema);