import { useState, useRef } from "react";
import { TextField, Button } from "@mui/material";
import "../globals.css";

const TodoList = ({ todos, setTodos }) => {
  const [onEdit, setOnEdit] = useState(0);
  const [edited, setEdited] = useState("");

  const dragItem = useRef();
  const dragOverItem = useRef();

  const dragStart = (e, position) => {
    dragItem.current = position;
    console.log(e.target);
    e.target.style.opacity = 1.2;
  };

  const dragEnter = (e, position) => {
    dragOverItem.current = position;
    console.log(e.target.innerHTML);
    e.target.style.opacity = 1.2;
  };

  const dropItem = (e) => {
    const copyListItems = [...todos];
    const dragItemContent = copyListItems[dragItem.current];
    copyListItems.splice(dragItem.current, 1);
    copyListItems.splice(dragOverItem.current, 0, dragItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    e.target.style.opacity = 1.2;
    setTodos(copyListItems);
  };

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
    setEdited("");
  };

  console.log(edited);

  return (
    <ul>
      {todos.map((todo, i) => (
        <li
          onDragStart={(e) => dragStart(e, i)}
          onDragEnter={(e) => dragEnter(e, i)}
          onDragEnd={(e) => dropItem(e)}
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
                placeholder={todo.content}
                sx={{
                  "& fieldset": { border: "none" },
                  width: "80%",
                  padding: "0",
                }}
              />
              <button disabled={!edited} type="submit" className="done">
                Done
              </button>
            </form>
          ) : (
            <div className="edit-form">
              <span className="todo-text" onClick={() => markTodo(todo.id)}>
                {todo.content}
              </span>
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
