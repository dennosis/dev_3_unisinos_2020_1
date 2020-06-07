const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

const Schema = mongoose.Schema;

let UserInfoSchema = new Schema({
    user :{
        type: mongoose.Schema.Types.ObjectId, 
        ref:'User',
        required:true,
        unique:true,
    },
    cpf:{
        type: Number,
        required:true,
        unique:true,
    },
    rg:{
        type: Number,
        required:true,
    },
    cellphone:{
        type: Number,
        required:true,
    },
    phone:{
        type: Number
    },
    cnhNumber:{
        type: Number,
        required:true,
        unique:true,
    },
    cnhExpirationDate:{
        type: Date,
        required:true,
    },
    cnhCategory:{
        type: String,
        required:true,
        max: 2
    },
    cep:{
        type: Number,
        required:true,
    },
    address:{
        type: String,
        required:true,
    },
    number:{
        type: Number,
        required:true,
    },
    residentialComplement:{
        type: Number,
    },
    neighborhood:{
        type: String,
        required:true,
    },
    city:{
        type: String,
        required:true,
    },
    uf:{
        type: String,
        required:true,
        max: 2
    },
    createdAt:{
        type:Date,
        default:Date.now,
        select:false,
    }
});

module.exports = mongoose.model('UserInfo', UserInfoSchema);
