const express = require('express');
const connectDB = require('./config/db');

const { success, error } = require('./app/utils/apiResponse');

const app = express();

// connect to database
connectDB();

// init middleware
app.use(express.json({ extended: false }));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, PUT, DELETE');
    next();
});

app.get('/', (req, res) => {
    res.json(success('Welcome to Blog-API'));
});

// routes
app.use('/api/auth', require('./routes/users'));
app.use('/api/blog-posts', require('./routes/posts'));

// handle unhandled routes
app.all('*', (req, res) => {
    res.status(404).json(error(`${req.originalUrl} route does not exist on this server`));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
