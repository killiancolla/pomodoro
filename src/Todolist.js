// src/ToDoList.js
import React, { useState } from 'react';
import './Todolist.css';

const ToDoList = () => {
  const [items, setItems] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddItem = () => {
    if (inputValue.trim()) {
      setItems([...items, { text: inputValue.trim(), checked: false }]);
      setInputValue('');
    }
  };

  const handleToggleItem = (index) => {
    const newItems = [...items];
    newItems[index].checked = !newItems[index].checked;
    setItems(newItems);
  };

  const handleRemoveItem = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  return (
    <div className="to-do-list">
      <h2>ToDo List</h2>
      <h3>Vous avez effectué {Math.round((items.filter((item) => item.checked).length) * 100 / items.length)}% de vos tâches</h3>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Ajouter une tâche..."
      />
      <button onClick={handleAddItem}>Ajouter</button>
      <ul>
        {items.map((item, index) => (
          <li key={index} className={item.checked ? 'checked' : ''}>
            <input
              type="checkbox"
              checked={item.checked}
              onChange={() => handleToggleItem(index)}
            />
            {item.text}
            <button onClick={() => handleRemoveItem(index)}>Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ToDoList;
