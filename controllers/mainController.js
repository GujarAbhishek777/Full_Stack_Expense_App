const path = require('path');
const Expense = require('../models/detail');

exports.AddDetails = async (req,res,next)=>{
    try {
      
      const amount = req.body.amount;
      const category = req.body.category;
      const description = req.body.description;
      
  
      if (!amount) {
          throw new Error('Amount is mandatory !')
      }
      const data = await Expense.create({
          amount : amount,
          category : category,
          description : description
      })
  
      res.status(201).json({ newExoenseDetail: data });
  } catch (err) {
      console.log(err);
      res.status(500).json({ error: err });
  }
}
exports.getDetails=async (req,res,next)=>{
    try{
        const Users = await Expense.findAll();
       
        res.status(200).json({allUsers : Users});
    }catch(err) {
        console.log(err);
        res.status(500).json({error : err})
    }
}
exports.deleteDetails = async (req, res, next) => {
    try{
        const id = req.params.id;
        const user = await Expense.findAll({where: {id:id}});
        if(!user){
            console.log('This user does not exist.');
            return res.sendStatus(400);
        }
        await Expense.destroy({where: {id:id}});
        res.sendStatus(200);
        }catch(err){
            console.log(err);
            res.status(500).json({error : err})
        }
}
exports.editDetails = async (req, res, next) => {
    try{
        
        const updatedamount = req.body.amount;
        const updateddescription = req.body.description;
        const updatedcategory = req.body.category;
        const id = req.params.id;
        console.log(id);
        let user = await Expense.update(
            {
                amount : updatedamount,
            category:updatedcategory,
            description:updateddescription
            },
                {where:{id:id}})
                console.log(user);
                res.status(201).json({user}); 
    }catch(err){
        console.log(err);
        res.status(500).json({error : err})
    }
}