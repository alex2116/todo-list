const express = require('express')
const mongoose = require('mongoose')

const exphbs = require('express-handlebars')

const bodyParser = require('body-parser')

const Todo = require('./models/todo')
const { rawListeners } = require('./models/todo')

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
  .sort({ _id: 'asc'})
  .then(todos => res.render('index', {todos})) //這邊也有return 只是省略了
  .catch(error => console.log(error))
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
  return Todo.findById(id) //從資料庫裡找出資料
    .lean()                //把資料轉換成單純的JS物件
    .then(todo => res.render('detail', {todo}))   //把資料送給前端樣板
    .catch(error => console.log(error))
})

app.get('/todos/:id/edit', (req, res) => {
  const id = req.params.id
  return Todo.findById(id) //從資料庫裡找出資料
    .lean()                //把資料轉換成單純的JS物件
    .then(todo => res.render('edit', { todo }))   //把資料送給前端樣板
    .catch(error => console.log(error))
})

app.post('/todos/:id/edit', (req, res) => {
  const id = req.params.id
  const { name, isDone } = req.body

  return Todo.findById(id) //從資料庫裡找出資料
    .then(todo => {
      todo.name = name
      todo.isDone = isDone === 'on' // isDone ==='on' 為true, todo.isDone才會=true
      //if (isDone === 'on') { 如果isDone的checkbox有打勾，就會設定為on(HTML預設) (可以說值為on？)
      //  todo.isDone = true   如果有設定為on,todoSchma裡的isDone本來是false會變成true
      //}                 又因為handlebars有設定{{#if todo.isDone}} checked {{/if}},isDone要為true才有checked
      return todo.save()
     })
    .then(() => res.redirect(`/todos/${id}`))
    .catch(error => console.log(error))
})   
    
app.post('/todos/:id/delete', (req,res) => {
  const id = req.params.id
  return Todo.findById(id)
    .then(todo => todo.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

app.listen(3000, () => {
  console.log('App is running on http://localhost:3000.')
})