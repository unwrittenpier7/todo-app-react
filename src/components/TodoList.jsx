import { useContext, useEffect, useState } from "react";
import { AppContext } from "../App";
import axios from "axios";
import './TodoList.css';

export default function TodoList() {
  const { todos, setTodos } = useContext(AppContext);
  const [task, setTask] = useState("");

  // Automatically use deployed backend if env variable is missing
  const API = import.meta.env.VITE_API_URL || "todo-node-app-git-main-joel-peters-projects.vercel.app";

  const fetchTodos = async () => {
    try {
      const res = await axios.get(`${API}/todos`);
      setTodos(res.data); // res.data should be an array
    } catch (err) {
      console.error("Error fetching todos:", err.message);
    }
  };

  const addTask = async () => {
    if (task.trim() === "") return;
    try {
      await axios.post(`${API}/todos/add`, { content: task }); // ✅ use 'content'
      setTask("");
      fetchTodos(); // refresh list after adding
    } catch (err) {
      console.error("Error adding task:", err.message);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API}/todos/${id}`);
      fetchTodos(); // refresh list after delete
    } catch (err) {
      console.error("Error deleting task:", err.message);
    }
  };

  useEffect(() => {
    fetchTodos(); // load tasks on mount
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