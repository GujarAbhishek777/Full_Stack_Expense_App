const Sequelize = require('sequelize');
const sequelize = require('../util/database')

const Expense = sequelize.define('expense', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    amount: 
    {type: Sequelize.INTEGER,
        allowNull: false,

    },
    description: {
        type: Sequelize.STRING,
        allowNull: false,
        distinct:true
    
    },
    category:{
        type:Sequelize.STRING,
        allowNull:false,
        distinct:true
    }
});
module.exports=Expense;