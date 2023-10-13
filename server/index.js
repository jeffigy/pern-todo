const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//middleware
app.use(cors()); // allows localhost:3000 to access localhost:5000
app.use(express.json()); // allows us to access req.body

//* ROUTES //
//get all todos
app.get("/todos", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM todos");
    res.json(allTodos.rows);
  } catch (error) {
    console.error(error.message);
  }
});

//get a todo
app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params; // url params
    const todo = await pool.query("SELECT * FROM todos WHERE todo_id = $1", [
      id,
    ]);
    res.json(todo.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

//create a todo
app.post("/todos", async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todos (description) VALUES ($1) RETURNING *",
      [description]
    );
    res.json(newTodo);
  } catch (error) {
    console.error(error.message);
  }
});

//update a todo
app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const UpdateTodo = await pool.query(
      "UPDATE todos SET description = $1 WHERE todo_id = $2",
      [description, id]
    );
    res.json("todo sucessfully updated");
  } catch (error) {
    console.error(error.message);
  }
});

//delete a todo
app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query(
      "DELETE FROM todos WHERE todo_id = $1",
      [id]
    );
    res.json("todo was successfully deleted");
  } catch (error) {
    console.error(error.message);
  }
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
