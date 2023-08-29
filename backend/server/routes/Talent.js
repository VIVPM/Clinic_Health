
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


router.delete("/:id",(req,res,next)=>{
  console.log("wait deleting");

  newUser.findOneAndDelete({_id:req.params.id }).then(result=>{
    if(result.n >0)
      {
        res.status(200).json({message:"update successful"});
      }else{
        res.status(401).json({message:"Not Authorized"});
      }
  console.log(result);

  })
  .catch(error=>{
    res.status(500).json({
      message:"Fetching the posts Failed !!!"
    })
  });

res.status(200) .json({message:"post deleted "});
  console.log(req.params.id);
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

router.get("",(req,res,next)=>{
  let fetchedDoc;
  newUser.find().then(responce=>{
    fetchedDoc=responce;
    return newUser.count();
  })
  .then(count=>{

    res.status(200).json({
      message:"posts fetched successfully",
      talents:fetchedDoc,
      maxTalent:count
    })
  })
  .catch(error=>{

    res.status(500).json({
      message:"Fetching the posts Failed !!!"
    })
  })
})

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



