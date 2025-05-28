import React, { useState } from 'react';
import axios from 'axios';

function Create({ onTaskAdded }) {
  const [task, setTask] = useState("");

  const handleAdd = () => {
    if (!task.trim()) return;

    axios.post('http://localhost:3001/add', { task })
      .then(result => {
        console.log("Task added:", result.data);
        setTask(""); // Clear the input field
        if (onTaskAdded) onTaskAdded(); // ✅ Notify parent to refresh list
      })
      .catch(err => console.log("Error:", err));
  };

  return (
    <div className='create_form'>
      <input
        type="text"
        value={task}
        onChange={e => setTask(e.target.value)}
        placeholder="Enter your task"
      />
      <button type="button" onClick={handleAdd}>Add</button>
    </div>
  );
}

export default Create;
