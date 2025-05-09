const mongoose = require('mongoose');
const connect = mongoose.connect("MONGO URL");


const userSchema = new mongoose.Schema({

    question1: { type: String},
    question2: { type: String},
    question3: { type: String},
    question4: { type: String},
    question5: { type: String},
    name: {type: String},
    nachname: {type: String},
    email: {type: String},
    tel: {type: String},
    
});

const modelUser = new mongoose.model("user", userSchema);

module.exports = modelUser;
