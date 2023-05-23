'use client'
import { useState } from "react";
import { TextField,Button, ThemeProvider, CardHeader } from "@mui/material";
import { createTheme } from '@mui/material/styles'
import './globals.css'
import TodoList from "./components/TodoList";
import { useEffect } from "react";

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

const addTodo = (e) => {
  e.preventDefault();
  if (!input) return;
  setTodos([...todos, { id: Date.now(), text: input, done: false }]);
  setInput("");
};

const saveChanges = () => {
  localStorage.setItem('todos', JSON.stringify(todos));
}
const deleteChanges = () => {
  localStorage.removeItem('todos');
}

useEffect(()=>{
  const list = JSON.parse(localStorage.getItem('todos'));
 list && setTodos(list)
},[])

return (
  <ThemeProvider theme={theme}>
  <div className="container">
    <header>
    <h1>Todo App</h1> <div className="header-buttons">
      <Button variant="outlined"color='neutral' sx={{margin:"10px"}} onClick={saveChanges}>Save</Button>
      <Button variant="outlined"color='neutral' sx={{margin:"10px"}} onClick={deleteChanges}>Delete</Button>
    </div>
    </header>
    <form onSubmit={addTodo}>
      <TextField
      fullWidth
      color='neutral'
      id="fullwidth"
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Add a new todo"
      />
      <Button 
      sx={{margin:"10px"}} disabled={!input}
      variant="outlined"color='neutral' type="submit">Add Todo</Button>
    </form>
  <TodoList todos={todos} setTodos={setTodos}/>
  </div>
 </ThemeProvider>
);




}

const theme = createTheme({
  status: {
    danger: '#e53e3e',
  },
  palette: {
    primary: {
      main: '#0971f1',
      darker: '#053e85',
    },
    neutral: {
      main: '#64748B',
      contrastText: '#fff',
    },
  },
});

export default TodoApp;
