'use client'
import { useState } from "react";
import { TextField,Button } from "@mui/material";
import './globals.css'
const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [onEdit, setOnEdit] = useState(0)
  const [edited, setEdited] = useState('')

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
const editTodo = (e,i) => {
 e.preventDefault()
 const temp = todos
 temp[i].text = edited
 setTodos(temp)
setOnEdit(0)
}
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
      {todos.map((todo,i) => (
        
        <li key={todo.id} draggable className={`todo-item ${todo.done ? "done" : ""}`}>
          {todo.id===onEdit? (
           <form className="edit-form" onSubmit={(e)=>editTodo(e,i)}style={{width:"100%"}}>
           <TextField
           fullWidth
           id="fullwidth"
             type="text"
             value={edited}
             onChange={(e) => setEdited(e.target.value)}
             placeholder={todo.text}
             sx={{"& fieldset": { border: 'none' },width:"80%",padding:"0"}}
           /><button type="submit"className="done">Done</button></form>
          ):(
            <div className="edit-form">
          <span onClick={() => markTodo(todo.id)}>{todo.text}</span>
          <div>
          <button className="edit"disabled={todo.done} onClick={() => setOnEdit(todo.id)}>
            Edit
          </button>
          <button className="delete" onClick={() => deleteTodo(todo.id)}>
            Delete
          </button>
          </div></div>)}
        </li>
      ))}
    </ul>
  </div>
);




}

export default TodoApp;
