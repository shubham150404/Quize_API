require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../model/User');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');


exports.Usercreate = async function (req, res, next) {
    try {
        console.log(req.body);
        if (!req.body.Username || !req.body.Email || !req.body.password) {
            throw new Error("please Fill data")
        }
        const emailcheck = await User.findOne({ Email: req.body.Email })
        if (emailcheck) {
            throw new Error("Email alredy Exist")
        }
        req.body.password = await bcrypt.hash(req.body.password, 10)
        if (!req.body.Userdate) {
            req.body.Userdate = Date.now();
        }
        if (!req.body.updatedAt) {
            req.body.updatedAt = Date.now();
        }
        const User_data = await User.create(req.body)
        const Signtoken = jwt.sign({ id: User_data._id }, process.env.SECRET_USER)
        res.status(201).json({
            status: "success",
            message: "user created",
            data: User_data,
            Signtoken
        })
    } catch (error) {
        res.status(404).json({
            status: "faild",
            message: error.message
        })
    }
} 

exports.UserLogin = async function (req, res, next) {
    try {
      if (!req.body.Email || !req.body.password) {
        throw new Error("please Fill data")
      }
      const email_check = await User.findOne({ Email: req.body.Email })
      if (!email_check) {
        throw new Error("Email not Exist")
      }
      const passcheck = bcrypt.compare(req.body.password, email_check.password)
      if(!passcheck){
        throw new Error("wrong password")
      }
      const logintoken = jwt.sign({ id :email_check._id },process.env.SECRET_USER)
      res.status(201).json({
        status: "success",
        message: "user login",
        data: email_check,
        logintoken
      })
    } catch (error) {
      res.status(404).json({
        status: "faild",
        message: error.message
      })
    }
}

exports.UserFind = async function (req, res, next) {
  try {
    const user_get = await User.find()
    res.status(201).json({
      status: "success",
      message: "user Find",
      data: user_get,
    })
  } catch (error) {
    res.status(404).json({
      status: "faild",
      message: error.message
    })
  }
}

exports.UserDelete = async function (req, res, next) {
  try {
    id = req.params.id
    await User.findByIdAndDelete(id)
    res.status(201).json({
      status: "success",
      message: "User Delete",
    })
  } catch (error) {
    res.status(404).json({
      status: "faild",
      message: error.message
    })
  }
}

exports.UserUpdate = async function (req, res, next) {
  try {
    id = req.params.id
    const UpdateUser =  await User.findByIdAndUpdate(id,req.body)
    res.status(201).json({
      status: "success",
      message: "User Update",
      data: UpdateUser,
    })
  } catch (error) {
    res.status(404).json({
      status: "faild",
      message: error.message
    })
  }
}

exports.UserSequre = async function (req, res, next) {
  try {
    let Usertoken = req.headers.authorization
    if(!Usertoken){
      throw new Error("Token not Found")
    }
    let token_data = jwt.verify(Usertoken,process.env.SECRET_USER)
    next()
  } catch (error) {
    res.status(404).json({
      status: "faild",
      message: error.message
    })
  }
} 