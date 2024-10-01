const express = require('express');

const app = express();
const PORT = 5550 || process.env.DB_PORT;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.use('/', require('./routes/index'));
