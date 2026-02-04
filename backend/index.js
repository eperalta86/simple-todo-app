const express = require('express'); // import alike
const app = express();
const PORT = 3000;

app.use(express.json());

//fake data
let tasks = [
    { id: 1, title: "Task 1", completed: false },
    { id: 2, title: "Task 2", completed: true }
];

// getmapping alike
 app.get('/', (req, res) => {
   res.send('Test');
});

app.get('/tasks', (req, res) => {
    res.json(tasks); //array to json.
});

app.put('/tasks/:id', (req, res) => {
    // Nota: req.params.id siempre es un String, por lo que es necesario un cast. 
    const id = parseInt(req.params.id);
    
    // stream().findFirst() en Java
    const task = tasks.find(t => t.id === id);

    if (task) {
        // Invertimos el estado: si era false pasa a true, y viceversa
        task.completed = !task.completed;
        res.json(task);
    } else {
        res.status(404).send('Tarea no encontrada');
    }
});

//fake add
app.post('/tasks', (req, res) => {
    const newTask = {
        id: tasks.length + 1, //fake autoid
        title: req.body.title,
        completed: false
    };

    tasks.push(newTask);
    
    res.status(201).json(newTask);
});


app.delete('/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    
    // Filtramos la lista para quedarnos con todo MENOS la tarea a borrar
    // En lugar de borrar, creamos una nueva lista sin ese elemento.
    const initialLength = tasks.length;
    tasks = tasks.filter(t => t.id !== id);

    if (tasks.length < initialLength) {
        // 204 No Content: Se borró bien, no hay nada que devolver
        res.status(204).send(); 
    } else {
        res.status(404).send('Tarea no encontrada');
    }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
