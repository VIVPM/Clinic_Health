const express = require('express')

const router = express.Router();

const newPatient = require('../model/model3')

router.post("/appoinment", (req,res,next)=>{

     console.log(req.body.name);

    const talent = new newPatient({
      // id:req.body.id,
      name:req.body.name,
      date:req.body.date,
      email:req.body.email,
      phone:req.body.phone,
      health:req.body.health,
      status:req.body.status
    })

      console.log("Currently adding the item .");
  talent.save().then(result=>{
        console.log(result);

        res.status(201).json({
          message:"post added successfully",
          patients:{
            id:result._id,
            name:result.name,
            date:result.date,
            email:result.email,
            phone:result.phone,
            health:result.health,
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
// router.get("/getPatients", (req, res, next) => {
//   let fetchedDoc;
//   newPatient.find()
//     .then(response => {
//       fetchedDoc = response;
//       return newPatient.count();
//     })
//     .then(count => {
//       res.status(200).json({
//         message: "posts fetched successfully",
//         talents: fetchedDoc,
//         maxTalent: newPatient.count()
//       });
//     })
//     .catch(error => {
//       res.status(500).json({
//         message: "Fetching the posts Failed !!!"
//       });
//     });
// });

router.get("/getPatients", async (req, res) => {
  try {
    const patients = await newPatient.find().exec();
    const count = await newPatient.countDocuments();
    console.log("patients",patients)
    console.log("count",count)
    res.status(200).json({
      message: "Posts fetched successfully",
      talents: patients,
      maxTalent: count
    });
  } catch (error) {
    console.error('Error fetching patients:', error);
    res.status(500).json({
      message: "Fetching the posts Failed !!!"
    });
  }
});



  router.get("/:id",(req,res,next)=>{
    newPatient.findById(req.params.id).then(post=>{
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
  router.get("/:name",(req,res,next)=>{
    // console.log(req.body.name);
    newPatient.find(req.params.name).then(post=>{
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
//   router.get("/:name",(req.res.next)=>{
//     let name = req.params.name;
//     newPatient.find({name:/name/i},function(err, post) {res.json(post);})
//   }
// );
  module.exports= router;

//   Router.route('/:id').get(function (req, res)
//  {
//     let id = req.params.id;
//     Books.findById(id, function (err, course) {
//         res.json(course);
//     });
// });
// Books.find({username: /username/i},function (err, course) {res.json(course);});
