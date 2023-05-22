import { useState } from "react";
import { TextField,Button } from "@mui/material";
import '../globals.css'


const TodoList = ({todos, setTodos}) => {
  const [onEdit, setOnEdit] = useState(0);
  const [edited, setEdited] = useState("");
  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };
  const markTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  };
  const editTodo = (e, i) => {
    e.preventDefault();
    const temp = todos;
    temp[i].text = edited;
    setTodos(temp);
    setOnEdit(0);
  };

  return (
    <ul>
      {todos.map((todo, i) => (
        <li
          key={todo.id}
          draggable
          className={`todo-item ${todo.done ? "done" : ""}`}
        >
          {todo.id === onEdit ? (
            <form
              className="edit-form"
              onSubmit={(e) => editTodo(e, i)}
              style={{ width: "100%" }}
            >
              <TextField
                fullWidth
                id="fullwidth"
                type="text"
                value={edited}
                onChange={(e) => setEdited(e.target.value)}
                placeholder={todo.text}
                sx={{
                  "& fieldset": { border: "none" },
                  width: "80%",
                  padding: "0",
                }}
              />
              <button type="submit" className="done">
                Done
              </button>
            </form>
          ) : (
            <div className="edit-form">
              <span onClick={() => markTodo(todo.id)}>{todo.text}</span>
              <div>
                <button
                  className="edit"
                  disabled={todo.done}
                  onClick={() => setOnEdit(todo.id)}
                >
                  Edit
                </button>
                <button className="delete" onClick={() => deleteTodo(todo.id)}>
                  Delete
                </button>
              </div>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};
export default TodoList;
