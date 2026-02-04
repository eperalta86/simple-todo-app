const express = require('express'); // Es como el 'import' de Java
const app = express();
const PORT = 3000;

// Esto es como un @GetMapping("/")
app.get('/', (req, res) => {
  res.send('¡Paralapapiricoipi!');
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
