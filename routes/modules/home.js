const express = require('express')

const router = express.Router()

const Todo = require('../../models/todo')

router.get('/', (req, res) => {
  //拿到全部的todo資料
  Todo.find() //沒有傳入任何參數，所以會撈出整份資料
    .lean()
    .sort({ _id: 'asc' })
    .then(todos => res.render('index', { todos })) //這邊也有return 只是省略了
    .catch(error => console.log(error))
})

module.exports = router

