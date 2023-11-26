require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

const usersRoutes = require('./controllers/users');

app.use(cors());
app.use(express.json());
app.use('/api/users', usersRoutes);

mongoose.connect(process.env.DB_URL)
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
