const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const eventRoutes = require('./routes/events');

const app=express();
//middleware
app.use(bodyParser.json());

//routes
app.use('/auth',authRoutes);
app.use('/events',eventRoutes);

//start server
const PORT=3000;
app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
})