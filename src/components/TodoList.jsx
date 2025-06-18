import { useContext, useEffect, useState } from "react";
import { AppContext } from "../App";
import axios from "axios";
import './TodoList.css';

export default function TodoList() {
  const { todos, setTodos } = useContext(AppContext);
  const [task, setTask] = useState("");
  const API = import.meta.env.VITE_API_URL;

  const fetchTodos = async () => {
    const res = await axios.get(`${API}/todos`);
    setTodos(res.data);
  };

  const addTask = async () => {
    if (task.trim() === "") return;
    await axios.post(`${API}/todos/add`, { task });
    setTask("");
    fetchTodos();
  };

  const deleteTask = async (id) => {
    await axios.delete(`${API}/todos/${id}`);
    fetchTodos();
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="todo-container">
      <h2>To-Do List</h2>
      <input
        type="text"
        placeholder="Enter a task..."
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button onClick={addTask}>Add</button>

      <ul>
        {todos.map((t) => (
          <li key={t._id}>
            {t.task}
            <button onClick={() => deleteTask(t._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}