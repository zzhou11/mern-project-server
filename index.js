const express = require('express');

const app = express();
const mongoose = require('mongoose');
const routes = require('./routes/api');
// Work with .env variables
require('dotenv').config();

const port = process.env.PORT || 5000;

// Connect to the database
mongoose
    .connect(process.env.DB, {
        useNewUrlParser: true, // Fall back to old MongoDB connection string parser
        useUnifiedTopology: true // Opts in to MongoDB's new connection management engine
    })
    .then(() => console.log('Database connected successfully'))
    .catch((err) => console.log(err));

// Since mongoose's Promise is deprecated, we override it with Node's Promise
mongoose.Promise = global.Promise;

// Handle CORS related issue from accessing from different domains
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use(express.json()); //Used to parse JSON bodies
app.use(express.urlencoded()); //Parse URL-encoded bodies

app.use('/api', routes);

app.use((err, req, res, next) => {
    console.log(err);
    next();
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Server running on port ${port}`);
});
