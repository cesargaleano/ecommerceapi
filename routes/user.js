const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('../middlewares/verifyToken');
const User = require('../models/User');
const router = require('express').Router();
const saltRounds = 10;


//UPDATE USER
router.put('/:id',verifyTokenAndAuthorization, async(req,res)=>{
   try{
    if(req.body.password) {
    req.body.password = await bcrypt.hash(user.password, saltRounds);
    }
    const updatedUser = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, {new:true});
    res.status(200).json({
        status:'success',
        msg: 'User updated successfully',
        updatedUser
    })
}catch(e){
    res.status(500).json({
        status:'error',
        msg: e.message,
   });
}
});

//DELETE USER
router.delete('/:id', verifyTokenAndAuthorization, async(req,res)=>{
 try{

    const userDeleted = await User.findByIdAndDelete(req.params.id);
    res.status(200).json({
        status:'success',
        msg: 'User deleted successfully',
        userDeleted 
    })

 }catch(e){
    res.status(500).json({
        status:'error',
        msg: e.message,
   });
 }
});

//GET USER BY ID
router.get('/find/:id', verifyTokenAndAdmin, async(req, res)=>{
    try{
    const user = await User.findById(req.params.id);
    const {password, ...other} = user._doc;
    res.status(200).json({
        status:'succes',
        msg: 'La busqueda se ha realizado satisfactoriamente',
        user: other
    });
}catch(e){
    res.status(500).json({
        status:'error',
        msg: e.message
    });

}
} );

//GET ALL USERS
router.get('/',verifyTokenAndAdmin, async(req,res)=>{
try{
    const users = await User.find();
    res.status(200).json({
        status:'succes',
        msg:'succes',
        users
    })
}catch(e){
    res.status(500).json({
        status:'error',
        msg: e.mesage

    });
}
});

module.exports = router;