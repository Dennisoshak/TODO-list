'use client'
import { useState } from "react";
import { TextField,Button } from "@mui/material";
import './globals.css'
const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

const addTodo = (e) => {
  e.preventDefault();
  if (!input) return;
  setTodos([...todos, { id: Date.now(), text: input, done: false }]);
  setInput("");
};
const deleteTodo = (id) => {
  setTodos(todos.filter((todo) => todo.id !== id));
};
const markTodo = (id) => {
  setTodos(
    todos.map((todo) => (todo.id === id ? { ...todo, done: !todo.done } : todo))
  );
};
return (
  <div className="container">
    <h1>Todo App</h1>
    <form onSubmit={addTodo}>
      <TextField
      variant="outlined"
      id="outlined-basic"
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Add a new todo"
      />
      <Button 
      sx={{margin:"10px"}}
      variant="outlined" type="submit">Add Todo</Button>
    </form>
    <ul>
      {todos.map((todo) => (
        <li key={todo.id} className={`todo-item ${todo.done ? "done" : ""}`}>
          <span onClick={() => markTodo(todo.id)}>{todo.text}</span>
          <button className="delete" onClick={() => deleteTodo(todo.id)}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  </div>
);




}

export default TodoApp;
