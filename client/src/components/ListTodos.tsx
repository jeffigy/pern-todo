import React, { useEffect, useState } from "react";
import { Button, Card, Typography } from "@material-tailwind/react";
import EditTodo from "./EditTodo";

const TABLE_HEAD = ["Description", "", ""];

const ListTodos: React.FC = () => {
  const [todos, setTodos] = useState([]);

  //* get all todos
  async function getTodos() {
    try {
      const res = await fetch("http://localhost:5000/todos");
      const todoArray = await res.json();
      setTodos(todoArray);
    } catch (err: any) {
      console.error(err.message);
    }
  }

  //* delete todo
  async function deleteTodo(id: number) {
    try {
      const res = await fetch(`http://localhost:5000/todos/${id}`, {
        method: "DELETE",
      });
      setTodos(todos.filter((todo: any) => todo.todo_id !== id));
    } catch (err: any) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    getTodos();
  }, []);

  console.log(todos);
  return (
    <Card className="h-full w-full overflow-scroll">
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th
                key={head}
                className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
              >
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {todos.map((todo: any) => (
            <tr>
              <td>{todo.description}</td>
              <td>
                <EditTodo
                  todo={{
                    description: todo.description,
                    todo_id: todo.todo_id,
                  }}
                />
              </td>
              <td>
                <Button
                  className="bg-red-900"
                  onClick={() => deleteTodo(todo.todo_id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
};
export default ListTodos;
