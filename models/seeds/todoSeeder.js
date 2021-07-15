const mongoose = require('mongoose')
const Todo = require('../todo')

mongoose.connect('mongodb://localhost/todo-list', { useNewUrlParser: true, useUnifiedTopology: true }) //seeder要connect 因為這是預先配置好的資料嗎？

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mogodb connected')

  for (let i = 0; i < 10; i++) {
    Todo.create({ name: `name-${i}` })  //Todo.create() 是 Mongoose 提供的資料操作方法
  }

  console.log('done.')
})