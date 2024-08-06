require('dotenv').config();
const mongoose = require('mongoose');
const Quize = require('../model/Quiz');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');


exports.Quizecreate = async function (req, res, next) {
    try {
      if (!req.body.Title || !req.body.description || !req.body.created_by || !req.body.questions) {
        throw new Error("please Fill the data")
      }
      if (!req.body.createdAt) {
        req.body.createdAt = Date.now();
      }
      if(!req.body.updatedAt){
        req.body.updatedAt = Date.now();
      }
      const Quize_data = await Quize.create(req.body)
      const Quizetoken =  jwt.sign({ id : Quize_data._id},process.env.SECRET_QUIZE)
      res.status(201).json({
        status: "success",
        message: "user created",
        data: Quize_data,
        Quizetoken
      })
    } catch (error) {
      res.status(404).json({
        status: "faild",
        message: error.message
      })
    }
}

exports.QuizeFind = async function (req, res, next) {
    try {
      const Quize_data = await Quize.find().populate('created_by').populate('questions')
      res.status(201).json({
        status: "success",
        message: "all Quize get",
        data: Quize_data,
      })
    } catch (error) {
      res.status(404).json({
        status: "faild",
        message: error.message
      })
    }
}

exports.QuizeUpdate =async function (req, res, next) {
    try {
      id = req.params.id
      const UpdateQuize =  await Quize.findByIdAndUpdate(id,req.body)
      res.status(201).json({
        status: "success",
        message: "Quize Update",
        data: UpdateQuize,
      })
    } catch (error) {
      res.status(404).json({
        status: "faild",
        message: error.message
      })
    }
}

exports.QuizeDelete =async function (req, res, next) {
    try {
      id = req.params.id
      await Quize.findByIdAndDelete(id)
      res.status(201).json({
        status: "success",
        message: "Quize Delete",
      })
    } catch (error) {
      res.status(404).json({
        status: "faild",
        message: error.message
      })
    }
}

exports.QuizeSequre = async function (req, res, next) {
  try {
    let Quizetoken = req.headers.authorization
    if(!Quizetoken){
      throw new Error("Token not Found")
    }
    let token_data = jwt.verify(Quizetoken,process.env.SECRET_QUIZE)
    next()
  } catch (error) {
    res.status(404).json({
      status: "faild",
      message: error.message
    })
  }
} 