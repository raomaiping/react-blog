const express = require("express");
const router = express.Router();
const cors = require('cors')
//引入User数据模型
const Profile = require("../../models/Profile");

//引入passport实现token验证
const passport = require("passport");


// $route  GET  api/profiles/:id
// @desc   按类别获取信息
// @access Public
router.get("/type",cors(), (req, res) => {
    Profile.find(req.query).then(profile=>{
        if (!profile) {
            return res.status(404).json("没有任何内容");
        }
        res.json({data:profile})
    }) 
});


// $route  GET  api/profiles
// @desc   获取所有信息
// @access Public

router.get("/", cors(),(req, res) => {
    Profile.find()
        .then(profile => {
            if (!profile) {
                return res.status(404).json("没有任何内容");
            }
            res.json({data:profile});
        })
        .catch(err => res.status(404).json(err));

});


// $route  GET  api/profiles/:id
// @desc   获取单个信息
// @access Public

router.get("/:id", cors(), (req, res) => {
    Profile.findOne({
            _id: req.params.id
        })
        .then(profile => {
            if (!profile) {
                return res.status(404).json("没有任何内容");
            } 
            res.json({data:profile})
        })
        .catch(err => res.status(404).json(err));

});

// $route  GET  api/profiles/view/:id
// @desc   更新访问量
// @access Public
router.get("/view/:id", cors(), (req, res) => {
    Profile.updateOne({_id: req.params.id},{$inc:{view_count:1}}).then(
        data=>{
            if(!data){
                return res.status(404).json("更新失败");  
            }
            res.json(data)
        }
    )
});


// $route  POST  api/profiles/add
// @desc   创建信息接口
// @access Private
router.post("/add", passport.authenticate("jwt", {
    session: false
}), (req, res) => {
    const profileFields = {};
    if (req.body.title) profileFields.title = req.body.title;
    if (req.body.view_count) profileFields.view_count = req.body.view_count;
    if (req.body.article_content) profileFields.article_content = req.body.article_content;
    if (req.body.introduce) profileFields.introduce = req.body.introduce;
    if (req.body.addTime) profileFields.addTime = req.body.addTime;
    if (req.body.typeName) profileFields.typeName = req.body.typeName;
    new Profile(profileFields).save().then(profile => {
        res.json({
            insertId:profile._id,
            isSuccess:true
        })
    })
});

// $route  POST  api/profiles/edit
// @desc   编辑信息接口
// @access Private
router.post("/edit/:id", passport.authenticate("jwt", {
    session: false
}), (req, res) => {
    const profileFields = {};

    if (req.body.title) profileFields.title = req.body.title;
    if (req.body.view_count) profileFields.view_count = req.body.view_count;
    if (req.body.article_content) profileFields.article_content = req.body.article_content;
    if (req.body.introduce) profileFields.introduce = req.body.introduce;
    if (req.body.addTime) profileFields.addTime = req.body.addTime;
    if (req.body.typeName) profileFields.typeName = req.body.typeName;

    Profile.findOneAndUpdate({
        _id: req.params.id
    }, {
        $set: profileFields
    }, {
        new: true
    }).then(profile => res.json({isSuccess:true}))
});

// $route  DELETE  api/profiles/delete/:id
// @desc  删除信息接口
// @access Private

router.delete('/delete/:id',passport.authenticate('jwt', { session: false }),(req, res) => {
    
    Profile.findOneAndRemove({_id: req.params.id })
        .then(profile => res.status(200).json(profile))
        .catch(err => res.status(404).json('删除失败'));
    });
module.exports = router;