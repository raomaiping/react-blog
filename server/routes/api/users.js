//@login & register
const express = require("express");
const router = express.Router();
const keys = require("../../config/keys");
//引入加密模块
const bcrypt = require("bcryptjs");

//引入User数据模型
const  User = require("../../models/User");

//引入全球公认头像模块
// const gravatar = require('gravatar');

//引入jwt实现token
const jwt = require("jsonwebtoken");

//引入passport实现token验证
const passport = require("passport");

// $route  GET  api/users/test
// @desc   返回的请求的json数据
// @access public
router.get("/test",(req,res) => {
    res.json({msg:"login works"})
})

// $route  POST  api/users/register
// @desc   返回的请求的json数据
// @access public
router.post("/register",(req,res) => {
    
//     //查询数据库中是否拥有邮箱
    User.findOne({username:req.body.username})
        .then((user) => {
            if(user){
                return res.status(400).json("用户名已存在");
            }else{

                const newUser = new User({
                    username:req.body.username,
                    password:req.body.password,
                })

                //加密
                bcrypt.genSalt(10, function(err, salt) {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err) throw err;

                        newUser.password = hash;

                        newUser.save()
                               .then(user => res.json(user))
                               .catch(err => console.log(err));
                               
                    });
                });
            }
        })
})


// $route  POST  api/users/login
// @desc   返回token jwt passport
// @access public
router.post("/login",(req,res) => {
    const username = req.body.username;
    const password = req.body.password;
    
    //查询数据库
    User.findOne({username})
        .then(user => {
            
            if(!user){
                return res.status(404).json("账号或密码错误");
            }
            //密码匹配
            bcrypt.compare(password, user.password)
                  .then(isMatch => {
                      if(isMatch){
                        //定义加密规则
                        const rule = {
                            id:user.id,
                            date:Date.now
                        };

                        // jwt.sign("规则","加密名字","过期时间","箭头函数");
                        jwt.sign(rule,keys.secretOrKey,{expiresIn:3600*24},(err,token) =>{
                            if(err) throw err;
                            res.json({
                                success:true,
                                token:"Bearer " + token
                            });

                        });
                        // res.json({msg:"success"});
                      }else{
                        return res.status(400).json("密码错误");
                    }
                  })    
        })
})


// $route  GET  api/users/current
// @desc   return current user
// @access Private
// router.get("/current",passport.authenticate("jwt",{session:false}),(req,res) => {
//     res.json({
//         id:req.user.id,
//         name:req.user.name,
//         email:req.user.email,
//         identity:req.user.identity
//     });
// })

module.exports = router;