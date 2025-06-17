import { useContext, useEffect, useState } from "react";
import { AppContext } from "../App";
import axios from "axios";
import './TodoList.css';

export default function TodoList() {
  const { todos, setTodos } = useContext(AppContext);
  const [task, setTask] = useState("");

  const API = import.meta.env.VITE_API_URL || "https://your-backend.vercel.app";

  const fetchTodos = async () => {
    try {
      const res = await axios.get(`${API}/todos`);
      setTodos(res.data);
    } catch (err) {
      console.error("GET failed:", err.message);
    }
  };

  const addTask = async () => {
    if (task.trim() === "") return;
    try {
      await axios.post(`${API}/todos/add`, { content: task });
      setTask("");
      fetchTodos();
    } catch (err) {
      console.error("POST failed:", err.message);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API}/todos/${id}`);
      fetchTodos();
    } catch (err) {
      console.error("DELETE failed:", err.message);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="todo-container">
      <h2>To-Do List</h2>
      <div className="todo-input-group">
        <input
          type="text"
          placeholder="Enter a task..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button onClick={addTask}>Add</button>
      </div>
      <ul>
        {todos.map((t) => (
          <li key={t._id}>
            {t.content}
            <button onClick={() => deleteTask(t._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
