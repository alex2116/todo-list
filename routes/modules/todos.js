const express = require('express')

const router = express.Router()

const Todo = require('../../models/todo')

router.get('/new', (req, res) => {
  return res.render('new')  
})

router.post('/', (req, res) => {
  const userId = req.user._id
  const name = req.body.name // 從 req.body 拿出表單裡的 name 資料
  return Todo.create({ name, userId })
    .then(() => res.redirect('/')) 
    .catch(error => console.log(error))
})

router.get('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Todo.findOne({ _id, userId }) //從資料庫裡找出資料
    .lean()                //把資料轉換成單純的JS物件
    .then(todo => res.render('detail', { todo }))   //把資料送給前端樣板
    .catch(error => console.log(error))
})

router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Todo.findOne({ _id, userId }) //從資料庫裡找出資料
    .lean()                //把資料轉換成單純的JS物件
    .then(todo => res.render('edit', { todo }))   //把資料送給前端樣板
    .catch(error => console.log(error))
})

router.put('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  const { name, isDone } = req.body

  return Todo.findOne({ _id, userId }) //從資料庫裡找出資料
    .then(todo => {
      todo.name = name
      todo.isDone = isDone === 'on' // isDone ==='on' 為true，todo.isDone才會是true
      //if (isDone === 'on') {   //如果isDone的checkbox有打勾，就會設定為on(HTML預設) (可以說值為on？)
      //  todo.isDone = true     //如果有打勾，設定就會變為on，todoSchma裡的isDone本來是false會變成true
      //}                 //如果沒有打勾，todo.isDone就是false，又因為handlebars有設定{{#if todo.isDone}} checked {{/if}}，isDone要為true才有checked
      return todo.save()
    })
    .then(() => res.redirect(`/todos/${_id}`))
    .catch(error => console.log(error))
})

router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Todo.findOne({ _id, userId })
    .then(todo => todo.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})


module.exports = router