import express from "express";
import cors from "cors";


const app = express();
app.use(express.json());
app.use(cors());

let todos = []; // in-memory

// Get all todos
app.get("/todos", (req, res) => res.json(todos));

// Add todo
app.post("/todos", (req, res) => {
  const todo = { id: Date.now(), text: req.body.text, done: false };
  todos.push(todo);
  res.json(todo);
});

// Toggle done
app.put("/todos/:id", (req, res) => {
  const todo = todos.find(t => t.id == req.params.id);
  if (!todo) return res.status(404).json({ error: "Not found" });
  todo.done = !todo.done;
  res.json(todo);
});

// Delete todo
app.delete("/todos/:id", (req, res) => {
  todos = todos.filter(t => t.id != req.params.id);
  res.json({ success: true });
});

app.listen(3000, () => console.log("✅ Todo API running at http://localhost:3000"));
