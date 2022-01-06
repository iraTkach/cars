const express = require('express');
const carsRouter = require('./routes/cars')
const connectDB = require('./config/database');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

connectDB();


app.use('/api/cars', carsRouter)
// app.use('/api/persons', personsRouter)

app.listen(8000, () => console.log(`app is listening on port 8000`));
// http://localhost:8000