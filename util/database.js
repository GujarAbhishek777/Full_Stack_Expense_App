const Sequelize = require('sequelize');
const sequelize = new Sequelize('fullstackexpense','root','Sumal@777',{
  dialect :'mysql',
  host:'localhost'
});

module.exports=sequelize;