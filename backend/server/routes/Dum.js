const express = require('express')

const router = express.Router();

const newUser = require('../model/dummodel')

router.post("/", async (req,res,next)=>{

  //  console.log(req.body.name);

  const talent = new newDum({
    // id:req.body.id,
    name:req.body.name,
    problem:req.body.problem,
    solution:req.body.solution,
    date:req.body.date,
    gender:req.body.gender,
    status:req.body.status
  })

    console.log("Currently adding the item .");
await talent.save().then(result=>{
      console.log(result);

      res.status(201).json({
        message:"post added successfully",
        talent:{
          id:result._id,
          name:result.name,
          problem:result.problem,
          solution:result.solution,
          date:result.date,
          gender:result.gender,
          status:result.status
      }
    })
  })
  .catch(error=>{
    console.log(error);
    res.status(404).json({
      message:"creating the post failed"
    })
  })
  // next();
})

router.put("/:id" ,(req,res,next)=>{

    const post = new newUser({
      _id:req.body.id,
      name:req.body.name,
      problem:req.body.problem,
      solution:req.body.solution,
      date:req.body.date,
      gender:req.body.gender,
      status:req.body.status
    });
    console.log("This is the post"+post);
  
    newDum.updateOne({_id:req.params.id  },post).then(
      result=>{
        // console.log(creator);
        // console.log(req.newUserData.newUserId);
        if(result.nModified>0)
        {
          res.status(200).json({message:"update successfull"});
        }else{
          res.status(401).json({message:"Not Authorized"});
        }
      }
    )
    .catch(error=>{
      console.log(error);
      res.status(500).json({
        message:"Could not update the post !!"
      })
    })
  })