import { TextField, Button, ThemeProvider, Snackbar } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";

const Main = ({ todos, setTodos }) => {
  const [input, setInput] = useState("");
  const [snack, setSnack] = useState("");
  const [message, setMessage] = useState("");

  const addTodo = (e) => {
    e.preventDefault();
    if (!input) return;
    setTodos([...todos, { id: Date.now(), text: input, done: false }]);
    setInput("");
  };

  const saveChanges = () => {
    const list = JSON.parse(localStorage.getItem("todos"));

    if (todos && JSON.stringify(list) !== JSON.stringify(todos)) {
      console.log(list, todos);
      localStorage.setItem("todos", JSON.stringify(todos));
      setSnack("saved");
      setMessage("Changes have been saved");
    } else setMessage("No changes to save");
  };
  const deleteChanges = () => {
    const list = JSON.parse(localStorage.getItem("todos"));
    if (list) {
      localStorage.removeItem("todos");
      setSnack("deleted");
      setMessage("Changes have been discarded");
    } else setMessage("No changes to discard");
  };

  useEffect(() => {
    const list = JSON.parse(localStorage.getItem("todos"));
    list && setTodos(list);
  }, []);

  const handleClose = () => {
    setMessage("");
  };

  return (
    <div className="container">
      <header>
        <h1>Todo App</h1>{" "}
        <div className="header-buttons">
          <Button
            variant="outlined"
            color="neutral"
            sx={{ margin: "10px" }}
            onClick={saveChanges}>
            Save Changes
          </Button>
          <Button
            variant="outlined"
            color="neutral"
            sx={{ margin: "10px" }}
            onClick={deleteChanges}>
            Discard Changes
          </Button>
        </div>
      </header>
      <form onSubmit={addTodo}>
        <TextField
          fullWidth
          color="neutral"
          id="fullwidth"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a new task"
        />
        <Button
          sx={{ margin: "10px" }}
          disabled={!input}
          variant="outlined"
          color="neutral"
          type="submit">
          Add Todo
        </Button>
      </form>
      <Snackbar
        open={message.length > 0}
        onClose={handleClose}
        autoHideDuration={2000}
        message={message}
      />
    </div>
  );
};
export default Main;
