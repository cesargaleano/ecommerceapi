const router= require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const saltRounds = 10;

//REGISTER
router.post('/register', async(req,res)=>{
    const user = req.body;
    try{
        const hash = await bcrypt.hash(user.password, saltRounds);
        user.password = hash;
        newUser = new User(user);
        newUserSaved = await newUser.save();
        console.log(newUser);
        res.status(201).json({
            status:'success',
            msg: 'Usuario Creado Exitosamente',
            newUserSaved
        });
        }catch(e){
            res.status(500).json({
                
                    status:'error',
                    msg: e.message,
             });
            }
});

router.post('/login', async(req,res)=>{
    console.log(req.body);
    try{
        console.log('Ingresando a login')
    const user = await User.findOne({username:req.body.username});
    console.log(user)
    if(!user) 
    
    return res.send({
        status:'error',
        msg: 'Usuario No encontrado',
 });
 
    const accessToken = jwt.sign({
        id: user._id,
        isAdmin: user.isAdmin
    }, process.env.JWT_SECRET_KEY,
    { expiresIn: "1h" } );

    const {password, ...other} = user._doc;
    const hashedPassword = await bcrypt.compare(req.body.password, user.password);
    if(hashedPassword) return res.status(201).json({
        status:'success',
        msg: 'Usuario Logueado Exitosamente',
        other,
        accessToken
 });
    return res.status(404).json({
        status:'error',
        msg:'Password o Username incorrectos'
    });
        }catch(e){
            return res.status(500).json({
                status:'error',
                msg:e.message
                })
}

});


module.exports = router;