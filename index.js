require('dotenv').config();
const express = require('express');
const mongoose  = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection
db.on('error', (err) => console.error(err));
db.once('open', () => console.log('Connected to DataBase'));

app.use(express.json());

const userRouter = require('./routes/users'); 
app.use('/users', userRouter);

app.listen(PORT, () => console.log(`Server started at port ${PORT}`));