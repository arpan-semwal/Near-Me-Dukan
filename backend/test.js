const express = require('express');
const app = express();

app.get('/data', (req, res) => {
  res.json({ message: 'Hello from the Hostinger backend!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
