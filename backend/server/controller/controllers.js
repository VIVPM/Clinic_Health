var Userdb=require('../model/model');

//create and save new user
exports.create=(req,res)=>{
    //validate request
    if(!req.body){
        res.status(400).send({message:"Content can not be empty!"})
        return;
    }

    //new User
    const user=new Userdb({
        name:req.body.name,
        problem:req.body.problem,
        solution:req.body.solution,
        gender:req.body.gender,
        status:req.body.status
    })

    //save user in the database
    user.save(user)
    .then(data=>{
        // res.send(data)
        res.redirect('/add-user')
    })
    .catch(err=>
        {
            res.status(500).send({message:err.message ||"Some error occurred while creating a create operation"});
        });
}

//retrieve and return all user/single user
exports.find=(req,res)=>{
if(req.query.id){
    const id=req.query.id;
    Userdb.findById(id)
    .then(data=>{
        if(!data)
        {
            res.status(404).send({message:`User not found with id`+id})
        }else{
            res.send(data);
        }
    })
    .catch(err=>{
        res.status(500).send({message:"Error retriving user with id"+id});
    })

}else{
    Userdb.find().then(user=>{
        res.send(user)
    })
    .catch(err=>{
        res.status(500).send({message:err.message ||"Error occured while retriving user"});
    })
}
}

//update a new identified user by user id
exports.update=(req,res)=>{
    if(!req.body){
        res.status(400).send({message:"Data to update can not be empty!"})
        return;
    }

    const id=req.params.id;
    Userdb.findByIdAndUpdate(id,req.body,{useFindAndModify:false})
    .then(data=>{
        if(!data){
            res.status(404).send({message:`cannot update user with ${id},Maybe user not found`})
        }else{
            res.send(data)
        }
    })
    .catch(err=>
        {
            res.status(500).send({message:"Error update user information"})
        })
}

//Delete a user with specified user id in the request
exports.delete=(req,res)=>{
    const id=req.params.id;

    Userdb.findByIdAndDelete(id)
    .then(data=>{
        if(!data)
        {
            res.status(404).send({message:`cannot delete user with ${id},Maybe user not found`})
        }else{
            res.send({
                message:"User was delete succesfully"
            })
        }
    })
    .catch(err=>
        {
            res.status(500).send({message:"could not delete User with id="+id})
        });
};

exports.store = (req, res, next) => {
    let event = new User({
      name: req.body.name,
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      phone: req.body.phone,
    });
    event
      .save()
      .then((response) => {
        res.json({
          message: "Event added successfully!",
        });
      })
      .catch((error) => {
        res.json({
          message: "An error Occured while adding the event!",
        });
      });
  };