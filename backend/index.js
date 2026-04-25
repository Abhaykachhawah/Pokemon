const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
require('./Models/db');

const PORT = process.env.PORT || 3001;
const PokemonRouter = require('./Routes/PokemonRouter');

// use simple middleware
app.use(cors());
app.use(express.json());

// my routes
app.use('/api/pokemon', PokemonRouter);

app.get('/', (req, res) => {
    res.send('Server is running!');
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});