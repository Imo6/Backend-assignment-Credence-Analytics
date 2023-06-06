const express = require('express')
const router=express.Router()
const User=require('../models/user')

//get all user
//http://localhost:9000/users
router.get('/', async(req,res)=>{
    try{
        const users = await User.find()
        res.json(users)
    }catch(err){
        res.send('Error : '+err)
    }
})

//create user
//http://localhost:9000/users
router.post('/',async(req,res)=>{
    const user=new User({
        name:req.body.name,
        img:req.body.img,
        summary:req.body.summary
    })
    try{
        const a=await user.save()
        res.json(a)
    }catch(err){
        res.send(err)
    }
})

//get user by his id
//http://localhost:9000/users/{id}
router.get('/:id', async(req,res)=>{
    try{
        const user = await User.findById(req.params.id)
        res.json(user)
    }catch(err){
        res.send('Error : '+err)
    }
})

// //update the user by his id
// //http://localhost:9000/users/{id}
// router.put('/:id', async(req,res)=>{
//     const id =req.params.id
//     const name=req.body.name
//     const img=req.body.img
//     const summary=req.body.summary

//     const index=User.findIndex((user)=>{
//         return (user.id==Number.parseInt(id))
//     })

//     if(index>=0){
//         const uid=User[index]
//         uid.name=name
//         uid.img=img
//         uid.summary=summary
//         res.json(uid)
//     }else{
//         res.status(400)
//     }   
// })

router.put('/:id', async (req, res) => {
  const id = req.params.id;
  const name = req.body.name;
  const img = req.body.img;
  const summary = req.body.summary;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        name: name,
        img: img,
        summary: summary,
      },
      { new: true } // Return the updated document
    );

    if (updatedUser) {
      res.json(updatedUser);
    } else {
      res.status(404).send('User not found');
    }
  } catch (err) {
    res.status(400).send(err);
  }
});


// Delete user
// http://localhost:9000/users
router.delete('/:id', async (req, res) => {
    try {
      const deletedUser = await User.deleteOne({ _id: req.params.id });
      res.json(deletedUser);
    } catch (err) {
      res.status(400).send(err);
    }
  });
  

module.exports= router