var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
const UploadModel = require('../models/upload.js');
var formidable = require('../node_modules/formidable');
// 上传
router.post('/upload',(req,res,next)=>{
    let form = new formidable.IncomingForm();
    form.uploadDir = "./upload";
    form.on('field', (field, value) => {
        // console.log(field);
        // console.log(value);
    });
    form.on('file', (name, file) => {
        // console.log(name);
        //  console.log(file);
    });
    form.on('end', () => {
        res.end('upload complete');
    })

    form.parse(req, function (err, fields, files) {
        console.log(files)
        console.log(fields)
        const {filename,type,des,use,user} = fields
        let extname = path.extname(files.file.name);

        new UploadModel({
            filename:filename+extname,type,des,use,user,extname
        }).save().then(data=>{

            let dirname = path.join(__dirname, "../");
            let oldpath = dirname + files.file.path;
            let newpath = dirname + 'upload/' + data._id + extname;
            fs.rename(oldpath, newpath, () => {
            });
        })
    })



})

// 获取

router.get('/list',(req,res,next)=>{
    UploadModel.find().then(data=>{
        res.send({code:0,msg:"获取列表成功",data:data})
    })
})
module.exports = router;
