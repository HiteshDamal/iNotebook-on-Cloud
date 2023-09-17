const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NotesSchema = new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'

    },
    title:{
     type: String,
     required:true
    },
    description:{
    type:String,   
     required:true
    },
    tag:{
     type:String,
     default:"general"
    },
    date:{
     type:Date,
     default:new Date
    }
     
   });
const Notes= mongoose.model('notes',NotesSchema);
module.exports=Notes;