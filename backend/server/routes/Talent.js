
const express = require('express')

const router = express.Router();

const newUser = require('../model/model2')

router.post("/", async (req,res,next)=>{

  //  console.log(req.body.name);

  const talent = new newUser({
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


router.delete("/:id", (req, res, next) => {
  console.log("wait deleting");

  newUser.findOneAndDelete({ _id: req.params.id }).then(result => {
    if (result) { // Check if result exists
      res.status(200).json({ message: "Deleted successfully" });
    } else {
      res.status(404).json({ message: "Record not found" });
    }
    console.log(result);
  }).catch(error => {
    console.error("Error deleting record:", error);
    res.status(500).json({
      message: "Deleting the record failed"
    });
  });
});


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

  newUser.updateOne({_id:req.params.id  },post).then(
    result=>{
      // console.log(creator);
      // console.log(req.newUserData.newUserId);
      if(result.nModified>0)
      {
        res.status(200).json({message:"update successful"});
      }
      // else{
      //   res.status(401).json({message:"Not Authorized"});
      // }
    }
  )
  .catch(error=>{
    console.log(error);
    res.status(500).json({
      message:"Could not update the post !!"
    })
  })
})

// router.get("",(req,res,next)=>{
//   let fetchedDoc;
//   newUser.find().exec().then(responce=>{
//     fetchedDoc=responce;
//     return newUser.count();
//   })
//   .then(count=>{

//     res.status(200).json({
//       message:"posts fetched successfully",
//       talents:fetchedDoc,
//       maxTalent: newUser.count()
//     })
//   })
//   .catch(error=>{

//     res.status(500).json({
//       message:"Fetching the posts Failed !!!"
//     })
//   })
// })

router.get("/getTalents",async (req,res) =>{
  try{
    const talent = await newUser.find().exec();
    const count = await newUser.countDocuments();
    res.status(200).json({message:"posts fetched successfully",
      talents:talent,
      maxTalent:count
  });
}catch(error){
  console.log("Error fetching talents:", error);
  res.status(500).json({
    message:"Fetching the posts Failed"
  });
}
});

router.get("/:id",(req,res,next)=>{
  newUser.findById(req.params.id).then(post=>{
    if(post){
      res.status(200).json(post);
    }else{
      res.status(404).json({message:'page not found'})
    }
  })
  .catch(error=>{

    res.status(500).json({
      message:"Fetching the posts Failed !!!"
    })
  })
})


module.exports= router



