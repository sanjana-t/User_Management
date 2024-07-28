const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const authMiddleware = require('./middleware/auth');
const roleMiddleware = require('./middleware/role');
const userRoutes = require('./routes/user');
require('./db')

const app = express()

app.use(bodyParser.json());
app.use('/auth',authRoutes);
app.use('/user', userRoutes); 

app.get('/admin',authMiddleware,roleMiddleware('admin'),(req,res)=>{
    res.send('welcome admin');
});

app.listen(3000,()=>{
    console.log('server running on port 3000');
});