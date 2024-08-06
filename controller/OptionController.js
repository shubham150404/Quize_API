require('dotenv').config();
const mongoose = require('mongoose');
const Option = require('../model/Option');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');


exports.Optioncreate = async function (req, res, next) {
    try {
      if (!req.body.questionId || !req.body.optionText || !req.body.isCorrect ) {
        throw new Error("please Fill the data")
      }
      if (!req.body.createdAt) {
        req.body.createdAt = Date.now();
      }
      if(!req.body.updatedAt){
        req.body.updatedAt = Date.now();
      }
      const Option_data = await Option.create(req.body)
      const Optiontoken =  jwt.sign({ id : Option_data._id},process.env.SECRET_OPTION)
      res.status(201).json({
        status: "success",
        message: "user created",
        data: Option_data,
        Optiontoken
      })
    } catch (error) {
      res.status(404).json({
        status: "faild",
        message: error.message
      })
    }
}

exports.OptionFind = async function (req, res, next) {
    try {
      const Option_data = await Option.find().populate('questionId')
      res.status(201).json({
        status: "success",
        message: "all data get",
        data: Option_data,
      })
    } catch (error) {
      res.status(404).json({
        status: "faild",
        message: error.message
      })
    }
}

exports.OptionDelete =async function (req, res, next) {
    try {
      id = req.params.id
      await Option.findByIdAndDelete(id)
      res.status(201).json({
        status: "success",
        message: "Option Delete",
      })
    } catch (error) {
      res.status(404).json({
        status: "faild",
        message: error.message
      })
    }
}

exports.OptionUpdate = async function (req, res, next) {
    try {
      id = req.params.id
      const UpdateOption =  await Option.findByIdAndUpdate(id,req.body)
      res.status(201).json({
        status: "success",
        message: "Option Update",
        data: UpdateOption,
      })
    } catch (error) {
      res.status(404).json({
        status: "faild",
        message: error.message
      })
    }
}

exports.OptionSequre = async function (req, res, next) {
  try {
    let Optiontoken = req.headers.authorization
    if(!Optiontoken){
      throw new Error("Token not Found")
    }
    let token_data = jwt.verify(Optiontoken,process.env.SECRET_OPTION)
    next()
  } catch (error) {
    res.status(404).json({
      status: "faild",
      message: error.message
    })
  }
}