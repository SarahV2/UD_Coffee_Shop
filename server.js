const express = require('express');
const app = express();

app.use(express.json({ extended: false }));

app.get('/', (req, res) => {
  res.send('Welcome to our coffee shop!');
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is listening on port ${port}`));
