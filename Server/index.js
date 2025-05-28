const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const TodoModel = require('./Models/Todo');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://rajsunny0022:Sunny111@cluster.mongodb.net/test?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB"))
.catch((err) => console.error("MongoDB connection error:", err));

app.get('/get', (req, res) => {
  TodoModel.find()
    .then(result => res.json(result))
    .catch(err => res.status(500).json(err));
});

app.put('/update/:id', async (req, res) => {
  try {
    const todo = await TodoModel.findById(req.params.id);
    if (!todo) return res.status(404).json({ error: "Todo not found" });

    todo.done = !todo.done;
    await todo.save();
    res.json(todo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/add', (req, res) => {
  console.log("Request received:", req.body);
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
  console.log("Server is Running on port 3001");
});
