const express = require("express");
const authMiddleware = require("./middleware");
const { Account } = require("../mongooseDB");
const { mongo, default: mongoose } = require("mongoose");
const router = express.Router();


router.get("/balance", authMiddleware, async (req, res) => {
    const account = await Account.findOne({
        userId: req.userId
    })

    res.json({
        balance: account.balance
    })
})


// Using transactions in daatabases
// using this helps us to deal with concurrent transactions

router.post("/transfer", authMiddleware, async (req, res) => {
    const session = await mongoose.startSession();

    session.startTransaction();

    const { amount, to } = req.body;

    const account = await Account.findOne({ userId: req.userId }).session(session);
    if (!account || account.balance < amount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Insufficient balance"
        })
    }

    const toAccount = await Account.findOne({ userId: to }).session(session);

    if (!toAccount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Invalid account"
        })
    }

    await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } });
    await Account.updateOne({ userId: to }, { $inc: { balance: amount } });

    await session.commitTransaction();

    alert("Transfer Successful")

    res.json({
        message: "Transfer Succesful"
    })
})

module.exports = router;