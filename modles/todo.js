const mongoose = require('mongoose')
const schema = mongoose.schema

const todoSchema = new schema({
  name: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Todo', todoSchema)