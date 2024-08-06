require('dotenv').config();
var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const User = require('../model/User');
const Question = require('../model/Question');
const Option = require('../model/Option');
const Quize = require('../model/Quiz');
const UserAttempt = require('../model/User_Attempt');
const User_Controller = require('../controller/User_controller');
const Option_controller = require('../controller/OptionController');
const Question_controller = require('../controller/QuestionController');
const Quize_controller = require('../controller/QuizeController');
const UserAttempt_controller = require('../controller/UserAttemptController');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

/* GET home page. */

// User
router.post('/User',User_Controller.Usercreate);

router.post('/UserLogin',User_Controller.UserLogin);

router.get('/UserGet',User_Controller.UserSequre,User_Controller.UserFind);

router.put('/UserUpdate/:id',User_Controller.UserSequre,User_Controller.UserUpdate);

router.delete('/UserDelete/:id',User_Controller.UserSequre,User_Controller.UserDelete);

// Option
router.post('/OptionCreate',Option_controller.Optioncreate );

router.get('/OptionGet',Option_controller.OptionSequre,Option_controller.OptionFind );

router.put('/OptionUpdate/:id',Option_controller.OptionSequre,Option_controller.OptionUpdate );

router.delete('/OptionDelete/:id', Option_controller.OptionSequre,Option_controller.OptionDelete );

// Question
router.post('/QuestionCreate',Question_controller.Questioncreate );

router.get('/QuestionGet', Question_controller.QuestionSequre,Question_controller.QuestionFind );

router.put('/QuestionUpdate/:id', Question_controller.QuestionSequre,Question_controller.QuestionUpdate );

router.delete('/QuestionDelete/:id',Question_controller.QuestionSequre,Question_controller.QuestionDelete );

// Quize
router.post('/QuizeCreate',Quize_controller.Quizecreate );

router.get('/QuizeGet',Quize_controller.QuizeSequre,Quize_controller.QuizeFind );

router.put('/QuizeUpdate/:id',Quize_controller.QuizeSequre,Quize_controller.QuizeUpdate );

router.delete('/QuizeDelete/:id',Quize_controller.QuizeSequre,Quize_controller.QuizeDelete );

// UserAttempt
router.post('/UserAttemptCreate',UserAttempt_controller.UserAttemptcreate );

router.get('/UserAttemptGet',Quize_controller.QuizeSequre,UserAttempt_controller.UserAttemptFind);

router.put('/UserAttemptUpdate/:id',Quize_controller.QuizeSequre,UserAttempt_controller.UserAttemptUpdate);

router.delete('/UserAttemptDelete/:id',Quize_controller.QuizeSequre,UserAttempt_controller.UserAttemptDelete);

module.exports = router;
