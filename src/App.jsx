import { useState } from "react";
import TodoList from "./components/TodoList";
import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { SnackbarProvider } from "notistack";
import TodosProvider from "./contexts/todoContext";

const theme = createTheme({
  typography: {
    fontFamily: [
      "alyamama", // ضع اسم خطك هنا
    ].join(","),
  },
});

const initialtodos = [];

function App() {
  const [todos, settodos] = useState(initialtodos);

  return (
    <>
      <SnackbarProvider maxSnack={3} dir="rtl">
        <TodosProvider>
          <ThemeProvider theme={theme}>
            <TodoList />
          </ThemeProvider>
        </TodosProvider>
      </SnackbarProvider>
    </>
  );
}

export default App;
