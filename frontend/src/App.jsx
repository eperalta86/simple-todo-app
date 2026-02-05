//hooks
import { useState, useEffect } from 'react'

function App() {
  //variables
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  //carga de datos
  useEffect(() => {
    fetch('http://localhost:3000/tasks')
      .then(res => res.json())
      .then(data => setTasks(data))
      .catch(err => console.error("Error cargando tareas:", err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault(); //

    if (!newTaskTitle) return; // si está vacío, no hacemos nada

    // enviamos lo datos al backend
    fetch('http://localhost:3000/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: newTaskTitle })
    })
    .then(res => res.json())
    .then(createdTask => {
      setTasks([...tasks, createdTask]);
      
      // limpiamos input
      setNewTaskTitle("");
    });
  };

  // === NUEVO: UPDATE (PUT) ===
  const handleToggle = (id) => {
    fetch(`http://localhost:3000/tasks/${id}`, {
      method: 'PUT'
      // No necesitamos body porque el backend solo invierte el valor actual
    })
    .then(res => res.json())
    .then(updatedTask => {
      // ACTUALIZAR ESTADO:
      // Java: tasks.stream().map(t -> t.id == id ? updatedTask : t).collect(Collectors.toList())
      // Aquí recorremos la lista. Si es la tarea que tocamos, ponemos la nueva. Si no, dejamos la vieja.
      setTasks(tasks.map(task => 
        task.id === id ? updatedTask : task
      ));
    });
  };

  // === NUEVO: DELETE (DELETE) ===
  const handleDelete = (id) => {
    fetch(`http://localhost:3000/tasks/${id}`, {
      method: 'DELETE'
    })
    .then(res => {
      if (res.ok) {
        // ACTUALIZAR ESTADO:
        // Java: tasks.removeIf(t -> t.id == id);
        // En React filtramos: "Dame todas las tareas MENOS la que acabo de borrar"
        setTasks(tasks.filter(task => task.id !== id));
      }
    });
  };

//renderizado
return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '500px', margin: '0 auto' }}>
      <h1>Mis Tareas</h1>

      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input 
          type="text" 
          placeholder="Nueva tarea..."
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          style={{ flex: 1, padding: '8px' }}
        />
        <button type="submit" style={{ padding: '8px 16px' }}>Agregar</button>
      </form>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {tasks.map(task => (
          <li key={task.id} style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            padding: '10px',
            borderBottom: '1px solid #eee',
            background: task.completed ? '#f0f0f0' : 'white'
          }}>
            {/* Texto de la tarea (Click para completar) */}
            <span 
              onClick={() => handleToggle(task.id)}
              style={{ 
                textDecoration: task.completed ? 'line-through' : 'none',
                cursor: 'pointer',
                flex: 1,
                color: task.completed ? '#888' : '#000'
              }}
            >
              {task.completed ? "✅ " : "⬜ "} 
              {task.title}
            </span>

            {/* Botón de borrar */}
            <button 
              onClick={() => handleDelete(task.id)}
              style={{ marginLeft: '10px', background: 'transparent', border: 'none', cursor: 'pointer' }}
            >
              🗑️
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App