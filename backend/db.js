const mongoose = require("mongoose");
const { Schema } = require("zod");

mongoose.connect(process.env.MONGO_URI);

const userSchema = mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
})

const accountSchema = mongoose.Schema({
    userId : [{type: mongoose.Schema.Types.ObjectId, ref: "User", required: true}],
    balance: {type: Number, required: true},

})

const Account = mongoose.model('Account',accountSchema);
const User = mongoose.model('User',userSchema);

module.exports = {
    User,Account
}