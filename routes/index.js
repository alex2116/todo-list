const express = require('express')    
const router = express.Router()       
const home = require('./modules/home') //載入home.js
const todos = require('./modules/todos') //載入todo.js
const users = require('./modules/users')

const { authenticator } = require('../middleware/auth')


router.use('/todos', authenticator, todos)
router.use('/users', users)
router.use('/', authenticator, home)

module.exports = router


