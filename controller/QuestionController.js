require('dotenv').config();
const mongoose = require('mongoose');
const Question = require('../model/Question');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');


exports.Questioncreate = async function (req, res, next) {
    try {
      if (!req.body.quizId || !req.body.questionText || !req.body.options ) {
        throw new Error("please Fill the data")
      }
      if (!req.body.createdAt) {
        req.body.createdAt = Date.now();
      }
      if(!req.body.updatedAt){
        req.body.updatedAt = Date.now();
      }
      const Question_data = await Question.create(req.body)
      const Questiontoken =  jwt.sign({ id : Question_data._id},process.env.SECRET_QUESTION)
      res.status(201).json({
        status: "success",
        message: "user created",
        data: Question_data,
        Questiontoken
      })
    } catch (error) {
      res.status(404).json({
        status: "faild",
        message: error.message
      })
    }
}

exports.QuestionFind = async function (req, res, next) {
    try {
      const Question_data = await Question.find().populate('quizId').populate('options')
      res.status(201).json({
        status: "success",
        message: "all Question get",
        data: Question_data,
      })
    } catch (error) {
      res.status(404).json({
        status: "faild",
        message: error.message
      })
    }
}

exports.QuestionUpdate =async function (req, res, next) {
    try {
      id = req.params.id
      const UpdateQuestion =  await Question.findByIdAndUpdate(id,req.body)
      res.status(201).json({
        status: "success",
        message: "Question Update",
        data: UpdateQuestion,
      })
    } catch (error) {
      res.status(404).json({
        status: "faild",
        message: error.message
      })
    }
}

exports.QuestionDelete =async function (req, res, next) {
    try {
      id = req.params.id
      await Question.findByIdAndDelete(id)
      res.status(201).json({
        status: "success",
        message: "Question Delete",
      })
    } catch (error) {
      res.status(404).json({
        status: "faild",
        message: error.message
      })
    }
}

exports.QuestionSequre = async function (req, res, next) {
  try {
    let Questiontoken = req.headers.authorization
    if(!Questiontoken){
      throw new Error("Token not Found")
    }
    let token_data = jwt.verify(Questiontoken,process.env.SECRET_QUESTION)
    next()
  } catch (error) {
    res.status(404).json({
      status: "faild",
      message: error.message
    })
  }
}