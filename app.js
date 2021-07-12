const express = require('express')
const mongoose = require('mongoose')

const exphbs = require('express-handlebars')

const bodyParser = require('body-parser')

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

app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  //拿到全部的todo資料
  Todo.find() //沒有傳入任何參數，所以會撈出整份資料
  .lean()
  .then(todos => res.render('index', {todos})) //這邊也有return 只是省略了
  .catch(error => console.error(error))
})

app.get('/todos/new', (req,res) => {
  return res.render('new') //為什這邊要return（已解）
})

app.post('/todos', (req, res) => {
  const name = req.body.name // 從 req.body 拿出表單裡的 name 資料
  
  return Todo.create({ name }) 
  .then(() => res.redirect('/'))
  .catch(error => console.log(error))
})

app.get('/todos/:id', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .lean()
    .then(todo => res.render('detail', {todo}))
    .catch(error => console.log(error))
})

app.listen(3000, () => {
  console.log('App is running on http://localhost:3000.')
})