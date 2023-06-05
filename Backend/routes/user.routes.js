const express = require("express")
const UserModel = require("../models/user.model")
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userRouter = express.Router()
require("dotenv").config()

// All users
userRouter.get("/", async (req, res) => {
    try {
        const users = await UserModel.find()
        res.status(200).send(users)
    } catch (error) {
        res.status(400).send({
            "message": error.message
        })
    }
})

// Registration
userRouter.post("/register", async (req, res) => {
    const { email, password, location, age } = req.body
    const users = await UserModel.findOne({ email })
    if (users) {
        res.status(400).send({
            "message": "Email already registered"
        })
    } else {
        try {
            bcrypt.hash(password, 5, async (err, hash) => {
                if (err) {
                    res.status(400).send({
                        "message": err.message
                    })
                } else {
                    const new_user = new UserModel({
                        email, password: hash, location, age
                    })
                    await new_user.save()
                    res.status(200).send({
                        "message": "User has been registered"
                    })
                }
            });
        } catch (error) {
            res.status(400).send({
                "message": error.message
            })
        }
    }
})

// Login
userRouter.post("/login", async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await UserModel.findOne({ email })
        if (user) {
            bcrypt.compare(password, user.password).then((result) => {
                if (result) {
                    res.status(200).send({
                        "message": "Login Successfull",
                        user,
                        "token": jwt.sign({ userId: user._id }, process.env.keyword)
                    })
                } else {
                    res.status(400).send({
                        "message": "Wrong Password"
                    })
                }
            });
        } else {
            res.status(400).send({
                "message": "User not registered"
            })
        }

    } catch (error) {
        res.status(400).send({
            "message": error.message
        })
    }
})

userRouter.get("/movies", (req, res) => {
    const token = req.headers.auth
    jwt.verify(token, process.env.keyword, function (err, decoded) {
        decoded ? res.status(200).send("Movies") : res.status(400).send({
            "message": err.message
        })
    });
})

module.exports = userRouter