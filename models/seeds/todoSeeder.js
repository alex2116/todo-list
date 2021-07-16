const Todo = require('../todo')

const db = require('../../config/mongoose')

db.once('open', () => {
  for (let i = 0; i < 10; i++) {
    Todo.create({ name: `name-${i}` })  //Todo.create() 是 Mongoose 提供的資料操作方法
  }
  console.log('done.')
})