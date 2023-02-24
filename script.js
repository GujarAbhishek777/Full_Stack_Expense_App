const path = require('path');

const express = require('express');
const sequelize = require('./util/database')
const cors = require('cors');

const bodyParser = require('body-parser');

const app = express();



app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use(cors());

const mainRoutes = require('./routes/main')
app.use(mainRoutes);

sequelize.sync().then((result)=>{
  
     app.listen(3000);
 })
 .catch((err)=>console.log(err));