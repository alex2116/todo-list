const express = require('express')    
const router = express.Router()       
const home = require('./modules/home') //載入home.js
const todos = require('./modules/todos') //載入todo.js
const users = require('./modules/users')

router.use('/', home)
router.use('/todos', todos)
router.use('/users', users)

module.exports = router


