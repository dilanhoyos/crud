import { isEmpty, size } from 'lodash';
import React, { useState } from 'react';
import shortid from 'shortid';
//useState is a hook, useful for saving data and modify it here

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [id, setId] = useState("");
  const [error, setError] = useState(null)

  const validForm = () => {
    let isValid = true;

    setError(null);

    if (isEmpty(task)) { // task is the form's value
      setError('Hay que ingresar una tarea');
      isValid = false;
    }

    return isValid;
  }

  const addTask = (e) => {
    e.preventDefault(); // Validate that the user don't let the form empty
    if (!validForm()) {
      return;
    }
    const newTask = {
      id: shortid.generate(),
      name: task // task:task
    }
    //console.log('OK');

    setTasks([ ...tasks, newTask ]);
    setTask("");
  }

  const deleteTask = (taskId) => {
    const filteredTasks = tasks.filter(task => task.id !== taskId);

    setTasks(filteredTasks);
  }

  const editTask = (task) => {
    setTask(task.name);
    setEditMode(true);
    setId(task.id);
  }

  const saveTask = (e) => {
    e.preventDefault(); // Validate that the user don't let the form empty
    if (isEmpty(task)) { // task is the form's value
      console.log("Task Empty");
      return;
    }

    const edittedTasks = tasks.map(item => item.id === id ? { id, name: task } : item);
    setTasks(edittedTasks);
    setEditMode(false);
    setTask("");
    setId("");
  }

  return (
    <div className="container mt-5">
      <h1>Tareas </h1>
      <hr/>
      <div className="row">
        <div className="col-8">
          <h4 className="text-center">Lista de Tareas</h4>
          <div className="my-4">
            {
              (size(tasks) === 0 ) ? (
                <li className="list-group-item">No Hay Tareas Programadas</li>
              ) : (
                <ul className="list-group">
                  {  
                    tasks.map((task) => (           
                    <li className="list-group-item" key={task.id}>
                      <span className="lead">{task.name}</span>
                      <button 
                        className="btn btn-danger btn-sm float-right mx-2" 
                        onClick={() => deleteTask(task.id)}
                      >Eliminar</button>
                      <button 
                        className="btn btn-warning btn-sm float-right" 
                        onClick={() => editTask(task)}
                      >Editar</button>
                    </li>
                    ))
                  }
                </ul>    
              )
            }
          </div>
        </div>
        <div className="col-4">
          <h4 className="text-center">{editMode ? 'Modificar Tarea' : 'Agregar Tarea'}</h4>
          <div className="my-4">
            <form onSubmit={editMode ? saveTask : addTask}>
              <input 
                type="text" 
                className="form-control mb-2" 
                placeholder="Ingrese la tarea" 
                onChange={(text) => setTask(text.target.value)} 
                value={task}
              />
              {
                error && 
                <div className="my-2">
                  <span className="text-danger">{error}</span>
                </div>
              }
              <button 
                className={editMode ? "btn btn-warning btn-block": "btn btn-dark btn-block"} 
                type="submit">{ editMode ? 'Guardar' : 'Agregar'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
