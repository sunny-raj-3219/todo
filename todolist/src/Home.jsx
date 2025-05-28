import React, { useEffect, useState } from 'react';
import './App.css';
import Create from './Create';
import axios from 'axios';
import { BsCircle, BsCheckCircleFill, BsFillTrashFill } from 'react-icons/bs';

function Home() {
  const [todo, setTodo] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
axios.get('https://todo-bkend-qcxt.onrender.com/get')
      .then(result => setTodo(result.data))
      .catch(err => console.log(err));
  };

  const handleEdit = (id) => {
axios.put(`https://todo-bkend-qcxt.onrender.com/update/${id}`)
      .then(() => fetchData())
      .catch(err => console.log(err));
  };

  const handleDelete = (id) => {
axios.delete(`https://todo-bkend-qcxt.onrender.com/delete/${id}`)
      .then(() => fetchData())
      .catch(err => console.log(err));
  };

  return (
<div className='home'>
  <h2>📝 Todo List</h2>
  <Create onTaskAdded={fetchData} /> {/* ✅ This is the updated line */}
  {todo.length === 0 ? (
    <div className="empty-list">No records found.</div>
  ) : (
    todo.map((item, index) => (
      <div className='todo-item' key={index}>
        <div className='checkbox' onClick={() => handleEdit(item._id)}>
          {item.done ? (
            <BsCheckCircleFill className='icon' />
          ) : (
            <BsCircle className='icon' />
          )}
          <p className={item.done ? "line_through" : ""}>{item.task}</p>
        </div>
        <div>
          <span onClick={() => handleDelete(item._id)}>
            <BsFillTrashFill className='icon delete-icon' />
          </span>
        </div>
      </div>
    ))
  )}
</div>

  );
}

export default Home;
