const express = require('express');
const  connectDb = require('./config/db');

const app = express();

connectDb();

app.get('/', (req, res) => res.send("App Running"));

//Init Middleware
app.use(express.json({extended: false})); //Code needed to get the request body when sending POST req

app.use('/api/users', require('./routes/api/users')); //matches the url to the resources path that is matched to the '/' request of the folder
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profiles', require('./routes/api/profile'));


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on ${PORT}`));