// src/ToDoList.js
import { t } from 'i18next';
import React, { useState, useRef } from 'react';
import '../styles/Todolist.css';
import Draggable from 'react-draggable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';



const ToDoList = (props) => {

  const draggableRef = useRef(null);
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
    <Draggable
      nodeRef={draggableRef}
      defaultClassName={`fullWindow ${props.show === true ? 'visible' : 'hidden'}`}
      handle='.header'>
      <div id="todolist" ref={draggableRef} className={`glass-1`}>
        <div className='header'>
          <div className='red'></div>
          <div onClick={() => props.onViewChange({ "_id": 1, "name": "To Do List" })} className='yellow'></div>
          <div className='green'></div>
          <h2>ToDo List</h2>
        </div>
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
              <label className="checkbox-container">
                <input
                  type="checkbox"
                  className="checkbox"
                  checked={item.checked}
                  onChange={() => handleToggleItem(index)}
                />
                <span className="checkbox-custom"></span>
              </label>
              <span className="item-text">{item.text}</span>
              <FontAwesomeIcon onClick={() => handleRemoveItem(index)} icon={faTrash} />
            </li>
          ))}
        </ul>
      </div>
    </Draggable>
  );
};

export default ToDoList;
