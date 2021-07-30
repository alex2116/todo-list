const express = require('express')

const router = express.Router()

const Todo = require('../../models/todo')

router.get('/', (req, res) => {
  const userId = req.user._id
  Todo.find({ userId }) //只搜尋userId的資料
    .lean()
    .sort({ _id: 'asc' })
    .then(todos => res.render('index', { todos })) //這邊也有return 只是省略了
    .catch(error => console.log(error))
})

module.exports = router

