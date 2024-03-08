const {Router} = require("express");
const User = require("../models/User");
 
const router =Router();

router.get('/signin' ,(req,res)=>{
    return res.render("signin");
})

router.get('/signup' ,(req,res)=>{
    return res.render("signup");
})

router.post('/signup' , async(req,res)=>{
    const {fullName,email, password} = req.body;
    
    console.log("Full Name" + fullName);
    try {
        await User.create({
            fullName: fullName,
            email: email,
            password: password,
        });
        return res.redirect("/");
        
    } catch (error) {
        console.log(error);
        
    }

})

module.exports = router;