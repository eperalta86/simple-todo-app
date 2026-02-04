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

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
