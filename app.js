const express = require('express')
const mongoose = require('mongoose')

const exphbs = require('express-handlebars')

const Todo = require('./models/todo')

const app = express()

mongoose.connect('mongodb://localhost/todo-list', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mogodb connected')
})

app.engine('hbs', exphbs({ defaultLayout:'main', extname:'.hbs'})) //副檔名要幹嘛？
app.set('view engine', 'hbs')

app.get('/', (req, res) => {
  //拿到全部的todo資料
  Todo.find() //沒有傳入任何參數，所以會撈出整份資料
  .lean()
  .then(todos => res.render('index', {todos}))
  .catch(error => console.error(error))
})

app.listen(3000, () => {
  console.log('App is running on http://localhost:3000.')
})