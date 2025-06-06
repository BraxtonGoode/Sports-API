const express = require('express');
const cors = require('cors');


const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());


// Routes
app.use('/', require('./routes'));


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    });