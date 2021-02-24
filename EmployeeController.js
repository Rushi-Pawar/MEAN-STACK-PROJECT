const express = require('express');
const router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId ;

const { Employee } = require('../Models/employee');

//=>  localhost:3000/employees/
router.get('/', (req,res) => {
    Employee.find((err,docs) => {
        if(!err){
            res.send(docs);
        }
        else
        {
             console.log ('The employee list is not found'+ JSON.stringify(err, undefined, 2)); 
        }
    });
});


 router.post('/',(req,res) => {
     var emp = new Employee ({
         name: req.body.name,
         position: req.body.position,
         office: req.body.office,
         salary: req.body.salary
     });
     emp.save((err,docs) => {
         if(!err){
             res.send(docs);
         }
         else
         {
             console.log('Employee record is not added successfully' + JSON.stringify(err, undefined ,2 ));
         }
     });
 })


 router.get('/:id',(req,res) => {
      if(!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No record with given id: ${req.params.id}`);

     Employee.FindById(req.params.id,(err,docs) => {
         if(!err){
             res.send(docs)
         }
         else
         {
            console.log('Error in retriving employee' + JSON.stringify(err, undefined ,2));
         }
     });

 })


  router.put('/:id',(req,res) => {
      if(!ObjectId.isValid(req.params.id))
      return res.status(400).send(`No record with given id: ${req.params.id}` );

        var emp = {
              name: req.body.name,
              position: req.body.position,
              office: req.body.office,
              salary: req.body.salary
          }

      Employee.findByIdAndUpdate(req.params.id, { $set: emp }, { new: true} , (err,docs) => {
          if(!err){
              res.send(docs);
          }
          else{
              console.log('Error in employee update:' + JSON.stringify(err, undefined , 2));
          }

      });   
  })


  router.delete('/:id',(req,res) => {
      if(!ObjectId.isValid(req.params.id))
      return res.status(400).send(`No record with given id: ${req.params.id}`);

      Employee.findByIdAndRemove(req.params.id,(err,docs) => {
          if(!err){
              res.send(docs)
          }
          else
          {
              console.log('Error in employee delete' + JSON.stringify(err , undefined ,2));
          }
      });
  })




 module.exports = router ;
