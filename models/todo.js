var mongoose = require('mongoose')

const Schema = mongoose.Schema;
 
const todoSchema = new Schema({
    title: String,
    memo: String,
    due_date: Date,
    owner: String,
    isDone: Boolean,
    published_date: { type: Date, default: Date.now  }
});
 
module.exports =  mongoose.model('todo', todoSchema);