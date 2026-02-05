import './index.css'
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

  // update
  const handleToggle = (id) => {
    fetch(`http://localhost:3000/tasks/${id}`, {
      method: 'PUT'
      // No necesitamos body porque el backend solo invierte el valor actual
    })
    .then(res => res.json())
    .then(updatedTask => {
      setTasks(tasks.map(task => 
        task.id === id ? updatedTask : task
      ));
    });
  };

  // delete
  const handleDelete = (id) => {
    fetch(`http://localhost:3000/tasks/${id}`, {
      method: 'DELETE'
    })
    .then(res => {
      if (res.ok) {
        setTasks(tasks.filter(task => task.id !== id));
      }
    });
  };

//renderizado
return (
    // Contenedor principal: Centrado en pantalla (Flexbox)
    <div className="min-h-screen flex items-center justify-center py-10 px-4">
      
      {/* La Tarjeta (Card): Fondo blanco, sombra, bordes redondeados */}
      <div className="bg-white w-full max-w-md rounded-xl shadow-xl overflow-hidden border border-gray-100">
        
        {/* Encabezado */}
        <div className="bg-blue-600 p-6">
          <h1 className="text-2xl font-bold text-white text-center">
            Mis Tareas
          </h1>
          <p className="text-blue-100 text-center text-sm mt-1">
            Organiza tu día de forma simple
          </p>
        </div>

        <div className="p-6">
          {/* Formulario */}
          <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
            <input 
              type="text" 
              placeholder="¿Qué tienes pendiente?"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              // Clases: Borde gris, al hacer click (focus) se pone azul
              className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
            <button 
              type="submit" 
              className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700 font-semibold transition-colors shadow-md"
            >
              +
            </button>
          </form>

          {/* Lista de Tareas */}
          <ul className="space-y-3">
            {tasks.map(task => (
              <li 
                key={task.id} 
                // Clases dinámicas: Si está completa cambia el fondo y borde
                className={`flex items-center justify-between p-4 rounded-lg border transition-all duration-200 ${
                  task.completed 
                    ? "bg-green-50 border-green-200" 
                    : "bg-white border-gray-200 hover:shadow-md"
                }`}
              >
                {/* Texto y Checkbox simulado */}
                <div 
                  onClick={() => handleToggle(task.id)}
                  className="flex items-center gap-3 cursor-pointer flex-1 group"
                >
                  {/* Círculo del checkbox */}
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                    task.completed ? "bg-green-500 border-green-500" : "border-gray-300 group-hover:border-blue-400"
                  }`}>
                    {task.completed && <span className="text-white text-xs font-bold">✓</span>}
                  </div>
                  
                  {/* Título de la tarea */}
                  <span className={`text-lg transition-colors ${
                    task.completed ? "text-gray-400 line-through" : "text-gray-700"
                  }`}>
                    {task.title}
                  </span>
                </div>

                {/* Botón borrar (Icono SVG) */}
                <button 
                  onClick={() => handleDelete(task.id)}
                  className="text-gray-400 hover:text-red-500 p-2 rounded-full hover:bg-red-50 transition-all"
                  title="Eliminar"
                >
                  {/* SVG de un basurero para vernos pro */}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </li>
            ))}
          </ul>

          {/* Mensaje si no hay tareas */}
          {tasks.length === 0 && (
            <div className="text-center text-gray-400 mt-8">
              <p>🎉 No tienes tareas pendientes</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App