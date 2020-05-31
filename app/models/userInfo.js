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
    cell:{
        type: Number,
        required:true,
    },
    telephone:{
        type: Number
    },
    cnhNumber:{
        type: Number,
        required:true,
        unique:true,
    },
    cnhValidate:{
        type: Date,
        required:true,
    },
    cnhCategory:{
        type: String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now,
        select:false,
    }
});

module.exports = mongoose.model('UserInfo', UserInfoSchema);