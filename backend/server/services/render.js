const axios=require('axios');


exports.homeRoutes=(req,res)=>{
    //make get request to /api/users
    axios.get('https://clinic-health.onrender.com/api/users')
    .then(function(response){
        res.render('home',{users:response.data});
    })
    .catch(err=>
        {
            res.send(err);
        })

}
exports.add_user=(req,res)=>{
    res.render('add_patient')
}
exports.update_user=(req,res)=>{
    axios.get('https://clinic-health.onrender.com/api/users',{params:{id:req.query.id}})
    .then(function(userdata){
        res.render("update_patient",{user:userdata.data});
    })
    .catch(err=>
        {
            res.send(err);
        })
}
