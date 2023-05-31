"use client";
import { useState } from "react";

import { TextField, Button, ThemeProvider, Snackbar } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import "./globals.css";
import TodoList from "./components/TodoList";
import Main from "./components/main";

const TodoApp = () => {
  const [todos, setTodos] = useState([]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <Main todos={todos} setTodos={setTodos} />
        <TodoList todos={todos} setTodos={setTodos} />
      </ThemeProvider>
    </>
  );
};

const theme = createTheme({
  status: {
    danger: "#e53e3e",
  },
  palette: {
    primary: {
      main: "#0971f1",
      darker: "#053e85",
    },
    neutral: {
      main: "#64748B",
      contrastText: "#fff",
    },
  },
});

export default TodoApp;
