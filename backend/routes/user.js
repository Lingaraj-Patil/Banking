const express = require("express");
const zod = require("zod");
const { User, Account } = require("../db");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const { authMiddleware } = require("../middleware");

const signupSchema = zod.object({
    username: zod.string().email(),
    password: zod.string(),
    firstName: zod.string(),
    lastName: zod.string(),
})

router.post("/signup",async(req,res)=>{
    const body = req.body;
    const {success} = signupSchema.safeParse(req.body);
    if(!success){
        return res.json({
            message: "Email already taken / Incorrect inputs" 
        })
    }
    
    const existingUser = await User.findOne({
        username: req.body.username
    })
    if(existingUser){
        return res.json({
            message: "Email already taken / Incorrect inputs" 
        })
    }
    const user = await User.create({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName
    })
    const userId = user._id;

    await Account.create({
        userId,
        balance: 1 + Math.random()*10000
    })
    const token = jwt.sign({
        userId
    },JWT_SECRET);
    res.json({
        message: "User created successfully",
        token: token
    })
})

const signinSchema = zod.object({
    username: zod.string().email(),
    password: zod.string(),
})

router.post("/signin",async(req,res)=>{
    const {success} = signinSchema.safeParse(req.body);
    if(!success){
        return res.json({
            message: "Email already taken / Incorrect inputs" 
        })
    }
    const user = await User.findOne({username: req.body.username, password: req.body.password})
    if(user){
        const token = jwt.sign({
            userId: user._id
        },JWT_SECRET)
        return res.status(200).json({
            token: token
        })
    }
    return res.status(411).json({
        message:"error while logging in"
    })


})

const updateSchema = zod.object({
    password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
})

router.put("/",authMiddleware,async(req,res)=>{
    const {success} = signinSchema.safeParse(req.body);
    if(!success){
        return res.json({
            message: "Error while updating information" 
        })
    }
    await User.updateOne({_id:req.userId},req.body);
    res.json({
        message: "User information updated successfully"
    })
})

router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [
                {
                   firstName: { "$regex": filter }
                },
                {
                   lastName: { "$regex": filter }
                }
             ]
    })

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})

module.exports = router;

//step 8 part 2