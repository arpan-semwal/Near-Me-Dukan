const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World noice u did it');
});

const port = 3000;

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
