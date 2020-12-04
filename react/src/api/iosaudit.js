/*eslint-disable*/
import axios from 'axios'
const BASE = '/api'
// axios.defaults.withCredentials=true
export const reqGetCookie= ()=> axios.get(BASE+"/public/?")
export const reqPostLogin= (value)=> axios.post(BASE+"/public/?",value)
export const reqGetList= ()=> axios.post(BASE+"/public/?list")
export const reqPostRecord= (value)=> axios.post(BASE+"/public/?getrecord",value)
export const reqGetResponse= (timeStamp)=> axios.get(BASE+"/public/",{params:{getlog:"",time:timeStamp}})

// 修改
export const reqUpdate= (formdata)=> axios.post("http://iosaudit.xuegaogame.com/public/upload.php",formdata)


// 上传
// export const reqUpload= (formdata)=> axios.post(BASE+"/public/upload.php",formdata)
