import React, { useReducer, useState } from 'react';

// Definimos el reducer
const taskReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TASK':
      return [...state, { id: Date.now(), text: action.text }];
    case 'REMOVE_TASK':
      return state.filter(task => task.id !== action.id);
    default:
      return state;
  }
};

const UseReducerSection = () => {
  const [tasks, dispatch] = useReducer(taskReducer, []);
  const [newTask, setNewTask] = useState('');

  const handleAddTask = () => {
    if (newTask) {
      dispatch({ type: 'ADD_TASK', text: newTask });
      setNewTask('');
    }
  };

  return (
    <div className="container">
      <h2>Gestor de Tareas</h2>
      <div className="mb-3">
        <input 
          type="text" 
          className="form-control" 
          value={newTask} 
          onChange={(e) => setNewTask(e.target.value)} 
          placeholder="Añadir nueva tarea"
        />
      </div>
      <button className="btn btn-primary" onClick={handleAddTask}>
        Añadir Tarea
      </button>

      <ul className="mt-3">
        {tasks.map(task => (
          <li key={task.id} className="d-flex justify-content-between">
            {task.text}
            <button 
              className="btn btn-danger btn-sm" 
              onClick={() => dispatch({ type: 'REMOVE_TASK', id: task.id })}
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UseReducerSection;
