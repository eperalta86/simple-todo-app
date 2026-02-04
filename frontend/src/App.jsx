//hooks
import { useState, useEffect } from 'react'

function App() {
  //variables
  const [tasks, setTasks] = useState([]);

  //carga de datos
  useEffect(() => {
    fetch('http://localhost:3000/tasks')
      .then(res => res.json())
      .then(data => setTasks(data))
      .catch(err => console.error("Error cargando tareas:", err));
  }, []);

  // renderizado
  return (
    <div style={{ padding: '20px' }}>
      <h1>Mis Tareas</h1>
      
      {/* java alike = (tasks.isEmpty()) ... */}
      {tasks.length === 0 && <p>No hay tareas (o el server está apagado)</p>}

      <ul>
        {/* java alike = for (Task task : tasks) { ... } , usamos map en vez de iterar una lista de un tipo de objeto*/}
        {tasks.map(task => (
          <li key={task.id}>
            {task.title} 
            {task.completed ? " (Completado)" : " (Pendiente)"}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
