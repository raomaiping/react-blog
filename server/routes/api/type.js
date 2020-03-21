const express = require("express");
const router = express.Router();
const cors = require('cors')
//引入Type数据模型
const Type = require("../../models/Type");

//引入passport实现token验证
const passport = require("passport");

// $route  GET  api/type/test
// @desc   返回的请求的json数据
// @access public
router.get("/test", (req, res) => {
    res.json({
        msg: "type works"
    })
});

// $route  POST  api/type/add
// @desc   创建信息接口
// @access Private
router.post("/add", passport.authenticate("jwt", {
    session: false
}), (req, res) => {
    const typeInfo = {};

    if (req.body.typeName) typeInfo.typeName = req.body.typeName;
    if (req.body.icon) typeInfo.icon = req.body.icon;

    new Type(typeInfo).save().then(types => {
        if(!types){
            res.error('添加失败'); 
        }
        res.json({isSuccess:true})
    })
});



// $route  POST  api/type/edit
// @desc   编辑信息接口
// @access Private
router.post("/edit/:id", passport.authenticate("jwt", {
    session: false
}), (req, res) => {
    const typeInfo = {};
    if (req.body.typeName) typeInfo.typeName = req.body.typeName;
    if (req.body.icon) typeInfo.icon = req.body.icon;

    Type.findOneAndUpdate({
        _id: req.params.id
    }, {
        $set: typeInfo
    }, {
        new: true
    }).then(profile => res.json({isSuccess:true}))
});



// $route  GET  api/type
// @desc   获取所有分类
// @access Public

router.get("/",cors(), (req, res) => {
    Type.find()
        .then(types => {
            if (!types) {
                return res.status(404).json("暂无分类");
            }

            res.json(types);
        })
        .catch(err => res.status(404).json(err));
});

// $route  DELETE  api/type/delete/:id
// @desc  删除分类接口
// @access Private

router.delete('/delete/:id',passport.authenticate('jwt', { session: false }),(req, res) => {
    
    Type.findOneAndRemove({_id: req.params.id })
        .then(profile => res.status(200).json(profile))
        .catch(err => res.status(404).json('删除失败'));
    });

module.exports = router;