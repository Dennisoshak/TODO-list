"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabaseClient } from "./client";
import { TextField, Button, ThemeProvider, Snackbar } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import "./globals.css";
import TodoList from "./components/TodoList";
import SignIn from "./components/SignIn";
import { useEffect } from "react";

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [message, setMessage] = useState('')

  const router = useRouter();
  const user = supabaseClient.auth.getUser()
  console.log(user)

  useEffect(() => {
    const { data: authListener } = supabaseClient.auth.onAuthStateChange(
      (event, session) => {
        handleAuthSession(event, session);
        if (event === "SIGNED_IN") {
          const signedInUser = supabaseClient.auth.user();
          const userId = signedInUser.id;
          supabaseClient
            .from("profiles")
            .upsert({ id: userId })
            .then((_data, error) => {
              if (!error) {
                router.push("/");
              }
            });
        }
        if (event === "SIGNED_OUT") {
          router.push("/signin");
        }
      }
    );

    return () => {
      authListener.unsubscribe();
    };
  }, [router]);

  useEffect(() => {
    if (user) {
      if (router.pathname === "/signin") {
        router.push("/");
      }
    }
  }, [router.pathname, user, router]);

  const handleAuthSession = async (event, session) => {
    await fetch("/api/auth", {
      method: "POST",
      headers: new Headers({ "Content-Type": "application/json" }),
      credentials: "same-origin",
      body: JSON.stringify({ event, session }),
    });
  };


  const addTodo = (e) => {
    e.preventDefault();
    if (!input) return;
    setTodos([...todos, { id: Date.now(), content: input, done: false }]);
    setInput("");
  };

  const saveChanges = () => {
    const list = JSON.parse(localStorage.getItem("todos"));

    if (todos && JSON.stringify(list) !== JSON.stringify(todos)) {
      console.log(list, todos);
      localStorage.setItem("todos", JSON.stringify(todos));
     
      setMessage("Changes have been saved")
    } else setMessage("No changes to save")
  };
  const deleteChanges = () => {
    const list = JSON.parse(localStorage.getItem("todos"));
    if (list) {
      localStorage.removeItem("todos");
  
      setMessage("Changes have been discarded")

    }  else setMessage("No changes to discard")

  };

  useEffect(() => {
    const list = JSON.parse(localStorage.getItem("todos"));
    list && setTodos(list);
  }, []);

  const handleClose = () => {
    setMessage("");
  };
  return (
    <ThemeProvider theme={theme}>
      <div className="container">
        <header>
          <h1>Todo App</h1>{" "}
          <div className="header-buttons">
            <Button
              variant="outlined"
              color="neutral"
              sx={{ margin: "10px" }}
              onClick={saveChanges}
            >
              Save Changes
            </Button>
            <Button
              variant="outlined"
              color="neutral"
              sx={{ margin: "10px" }}
              onClick={deleteChanges}
            >
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
            type="submit"
          >
            Add Todo
          </Button>
        </form>
        <TodoList todos={todos} setTodos={setTodos} />
        <SignIn/>
        <Snackbar
          open={message.length > 0}
          onClose={handleClose}
          autoHideDuration={2000}
          message={message}
        />
      </div>
    </ThemeProvider>
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
