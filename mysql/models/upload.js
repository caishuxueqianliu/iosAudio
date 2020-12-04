
// 1.引入mongoose
const mongoose = require('mongoose');

// 2.字义Schema(描述文档结构)
const UploadSchema = new mongoose.Schema({
    filename: {type: String, required: true},//
    type: {type: String, required: true},//
    des: {type: String, required: true},
    use:  {type: String, required: true},
    user: {type: String, required: true},
    extname:{type: String, required: true},
    create_time: {type: Number, default: Date.now},

});

// 3. 定义Model(与集合对应, 可以操作集合)
const UploadModel = mongoose.model('uploads', UploadSchema);



// 4. 向外暴露Model
module.exports = UploadModel;
