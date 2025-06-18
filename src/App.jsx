import { useState } from 'react'
import './App.css'
import Todo from "./components/TodoList";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createContext } from "react";

export const AppContext = createContext();

function App() {
  const [todos, setTodos] = useState([]);

  return (
    <>
      <div>
      <AppContext.Provider value={{ todos, setTodos }}>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Todo />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </AppContext.Provider>
    </div>
    </>
  )
}

export default App