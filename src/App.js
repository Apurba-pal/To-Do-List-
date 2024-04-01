import React, { useState, useEffect } from 'react';
import './App.css'; // Import your CSS file
import listIcon from './img/list-solid.svg'; // Import the image

function ToDoList() {
  const [checkedTasks, setCheckedTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    console.log('Stored tasks:', storedTasks);
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, []);  


  useEffect(() => {
    console.log('Tasks updated:', tasks);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);
  

  const addTask = () => {
    if (inputValue.trim() === '') {
      alert('You must write something!!');
    } else {
      setTasks([...tasks, inputValue]);
      setInputValue('');
    }
  };

  const handleTaskClick = (index) => {
    const isChecked = checkedTasks.includes(index);
    const updatedCheckedTasks = isChecked
      ? checkedTasks.filter((item) => item !== index)
      : [...checkedTasks, index];
    setCheckedTasks(updatedCheckedTasks);
  };

  const handleDeleteClick = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  return (
    <div className="container">
      <div className="to-do-list">
        <h2>To-Do List <img src={listIcon} alt="list icon" /></h2>
        <div className="row">
          <input
            type="text"
            id="input-box"
            placeholder="Type here"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button onClick={addTask}>Add</button>
        </div>
        <ul id="list-container">
          {/* {tasks.map((task, index) => (
            <li key={index} className={checkedTasks.includes(index) ? 'checked' : ''} onClick={() => handleTaskClick(index)}>
              {task}
              <span onClick={() => handleDeleteClick(index)}>&times;</span>
            </li>
          ))} */}
          {tasks.map((task, index) => (
  <li key={index} className={checkedTasks.includes(index) ? 'checked' : ''} onClick={() => handleTaskClick(index)}>
    {task}
    <span onClick={() => handleDeleteClick(index)}>&times;</span>
  </li>
))}

        </ul>
      </div>
    </div>
  );
}

export default ToDoList;
