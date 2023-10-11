// src/ToDoList.js
import { exists, t } from 'i18next';
import React, { useState } from 'react';
import '../styles/Todolist.css';

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
    <div id="todolist" className='glass-2'>
      <div className='header'>
        <div className='red'></div>
        <div className='yellow'></div>
        <div className='green'></div>
      </div>
      <h2>ToDo List</h2>
      <h3>{t('youdo')} {items.length > 0 ? Math.round(((items.filter((item) => item.checked).length) * 100 / items.length)) : 0}% {t('ofyourtask')}</h3>
      <input
        type="text"
        value={inputValue}
        className='glass-1'
        onChange={handleInputChange}
        placeholder={t('addtask')}
      />
      <button className='glass-1' onClick={handleAddItem}>{t('add')}</button>
      <ul>
        {items.map((item, index) => (
          <li key={index} className={item.checked ? 'checked' : ''}>
            <input
              type="checkbox"
              className='glass-1'
              checked={item.checked}
              onChange={() => handleToggleItem(index)}
            />
            {item.text}
            <button className='glass-1' onClick={() => handleRemoveItem(index)}>{t('delete')}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ToDoList;
