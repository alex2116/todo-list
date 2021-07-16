const express = require('express')    
const router = express.Router()       
const home = require('./modules/home') //載入home.js
const todos = require('./modules/todos') //載入todo.js

router.use('/', home)
router.use('/todos', todos)

module.exports = router


