const express = require('express');
const app = express();

const connectDB = require('./config/db')

//Connect to the database 
connectDB();

app.use(express.json({ extended: false }));

app.get('/', (req, res) => {
  res.send('Welcome to our coffee shop!');
});

app.use('/api/drinks', require('./routes/api/drinks'))
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is listening on port ${port}`));
