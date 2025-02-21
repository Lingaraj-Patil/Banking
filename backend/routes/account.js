const express = require("express");
const { Account } = require("../db");
const { default: mongoose } = require("mongoose");
const { authMiddleware } = require("../middleware");
const router = express.Router();

router.get("/balance", authMiddleware, async (req, res) => {
    try {
        const account = await Account.findOne({
            userId: req.userId
        });

        if (!account) {
            return res.status(404).json({
                message: "Account not found"
            });     
        }

        res.status(200).json({
            balance: account.balance
        });
    } catch (error) {
        console.error("Error fetching account balance:", error);
        res.status(500).json({
            message: "An error occurred while fetching account balance"
        });
    }
});

router.post("/transfer",authMiddleware,async(req,res)=>{
    const session = await mongoose.startSession();

    session.startTransaction();
    const { amount,to } = req.body;

    const account = await Account.findOne({userId: req.userId}).session(session);

    if(!account || account.balance < amount){
        await session.abortTransaction();
        return res.status(403).json({
            message: "Insufficient Balance"
        })
    }

    const toAccount = await Account.findOne({userId: to}).session(session);

    if(!toAccount){
        await session.abortTransaction();
        return res.status(403).json({
            message: "Invalid Account"
        })
    }

    await Account.updateOne({userId: req.userId},{$inc:{balance: -amount}}).session(session);
    await Account.updateOne({userId: to},{$inc: {balance: amount}}).session(session);

    await session.commitTransaction();
    res.json({
        message: "Transfer Successfull"
    })
})



module.exports = router;