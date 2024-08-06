require('dotenv').config();
const mongoose = require('mongoose');
const UserAttempt = require('../model/User_Attempt');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');


exports.UserAttemptcreate = async function (req, res, next) {
    try {
      if (!req.body.userId || !req.body.quizId || !req.body.score ) {
        throw new Error("please Fill the data")
      }
      if (!req.body.attemptedAt) {
        req.body.attemptedAt = Date.now();
      }
      const UserAttempt_data = await UserAttempt.create(req.body)
      const UserAttempttoken =  jwt.sign({ id : UserAttempt_data._id},process.env.SECRET_USERATTEMPT)
      res.status(201).json({
        status: "success",
        message: "user created",
        data: UserAttempt_data,
        UserAttempttoken
      })
    } catch (error) {
      res.status(404).json({
        status: "faild",
        message: error.message
      })
    }
}

exports.UserAttemptFind = async function (req, res, next) {
    try {
      const UserAttempt_data = await UserAttempt.find().populate('userId').populate('quizId')
      res.status(201).json({
        status: "success",
        message: "all UserAttempt get",
        data: UserAttempt_data,
      })
    } catch (error) {
      res.status(404).json({
        status: "faild",
        message: error.message
      })
    }
}

exports.UserAttemptUpdate = async function (req, res, next) {
    try {
      id = req.params.id
      const UpdateUserAttempt =  await UserAttempt.findByIdAndUpdate(id,req.body)
      res.status(201).json({
        status: "success",
        message: "UserAttempt Update",
        data: UpdateUserAttempt,
      })
    } catch (error) {
      res.status(404).json({
        status: "faild",
        message: error.message
      })
    }
}

exports.UserAttemptDelete = async function (req, res, next) {
    try {
      id = req.params.id
      await UserAttempt.findByIdAndDelete(id)
      res.status(201).json({
        status: "success",
        message: "UserAttempt Delete",
      })
    } catch (error) {
      res.status(404).json({
        status: "faild",
        message: error.message
      })
    }
}

exports.UserAttemptSequre = async function (req, res, next) {
    try {
      let UserAttempt_token = req.headers.authorization
      if(!UserAttempt_token){
        throw new Error("Token not Found")
      }
      let token_data = jwt.verify(UserAttempt_token,process.env.SECRET_USERATTEMPT)
      next()
    } catch (error) {
      res.status(404).json({
        status: "faild",
        message: error.message
      })
    }
} 