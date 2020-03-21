const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
    name: {
        type: String, 
        required: true
    },
    email: {
        type: String, 
        required: true
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    locations : [
        {
            type: mongoose.Schema.Types.ObjectId, 
            ref:'Location'
        }
    ]
});

module.exports = mongoose.model('User', UserSchema);