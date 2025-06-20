import React, { useState, useEffect } from "react";

function App() {
  const [todos, setTodos] = useState(() => {
    // Load from localStorage
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });
  const [input, setInput] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    // Save to localStorage
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleAdd = () => {
    if (!input.trim()) return;
    if (editIndex !== null) {
      const updated = [...todos];
      updated[editIndex].text = input;
      setTodos(updated);
      setEditIndex(null);
    } else {
      setTodos([...todos, { text: input, done: false }]);
    }
    setInput("");
  };

  const handleDelete = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  const handleEdit = (index) => {
    setInput(todos[index].text);
    setEditIndex(index);
  };

  const toggleDone = (index) => {
    const updated = [...todos];
    updated[index].done = !updated[index].done;
    setTodos(updated);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>📝 To-Do List</h1>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter a task"
      />
      <button onClick={handleAdd}>{editIndex !== null ? "Update" : "Add"}</button>

      <ul>
        {todos.map((todo, index) => (
          <li key={index} style={{ margin: "10px 0" }}>
            <span
              style={{
                textDecoration: todo.done ? "line-through" : "none",
                marginRight: 10,
              }}
            >
              {todo.text}
            </span>
            <button onClick={() => toggleDone(index)}>
              {todo.done ? "Undone" : "Done"}
            </button>
            <button onClick={() => handleEdit(index)}>Edit</button>
            <button onClick={() => handleDelete(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
