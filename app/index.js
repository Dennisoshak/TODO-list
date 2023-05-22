'use client'
import { useState } from "react";
import { TextField,Button } from "@mui/material";
import './globals.css'
import TodoList from "./components/TodoList";

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

const addTodo = (e) => {
  e.preventDefault();
  if (!input) return;
  setTodos([...todos, { id: Date.now(), text: input, done: false }]);
  setInput("");
};

return (
  <div className="container">
    <h1>Todo App</h1>
    <form onSubmit={addTodo}>
      <TextField
      fullWidth
      id="fullwidth"
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Add a new todo"
      />
      <Button 
      sx={{margin:"10px"}}
      variant="outlined" type="submit">Add Todo</Button>
    </form>
  <TodoList todos={todos} setTodos={setTodos}/>
  </div>
);




}

export default TodoApp;
