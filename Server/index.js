const express = require('express')
const mongoose = require ('mongoose')
const cors = require('cors')
const TodoModel = require('./Models/Todo')

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://127.0.0.1:27017/test')

app.get('/get', (req, res)=>{
    TodoModel.find()
    .then(result=>res.json(result))
    .catch(err=>res.status(500).json(err))
})


app.put('/update/:id', async (req, res) => {
  try {
    const todo = await TodoModel.findById(req.params.id);
    if (!todo) return res.status(404).json({ error: "Todo not found" });

    todo.done = !todo.done; // Toggle done
    await todo.save();

    res.json(todo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.post('/add', (req, res) => {
  console.log("Request received:", req.body); // Debug log
  TodoModel.create({ task: req.body.task })
    .then(result => res.json(result))
    .catch(err => res.status(500).json(err));
});

app.delete('/delete/:id', (req, res) => {
  const { id } = req.params;
  TodoModel.findByIdAndDelete(id)
    .then(result => res.json(result))
    .catch(err => res.status(500).json(err));
});


app.listen(3001, () => {
    console.log("Server is Running")
})