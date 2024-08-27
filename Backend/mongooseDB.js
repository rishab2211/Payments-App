const mongoose = require("mongoose");
const { Schema } = mongoose;
require("dotenv").config();
const dbUrl = process.env.dbUrl;


mongoose.connect(dbUrl);

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 40,
        unique: true
    },
    password: {
        type: String,
        minLength: 4,
        maxLength: 20,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    }
});


const accountSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
})

const User = mongoose.model("User", userSchema);
const Account = mongoose.mongoose.model('Account', accountSchema);

module.exports = {
    User,
    Account
}