import { message } from "antd";


export const copyText= function (xx){
    xx.select(); // 选择对象用户定义的代码区域
   // console.log(xx)
    document.execCommand("Copy"); //原生copy方法执行浏览
    message.success("拷贝文本成功")

}

