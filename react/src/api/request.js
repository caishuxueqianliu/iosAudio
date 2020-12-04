/*eslint-disable*/
import axios from 'axios'

export const reqPostInfo = (url,value)=> axios.post(url,null,{params:value});

export const reqGetSeverList = (url,value)=>  axios.get(url+'?x='+value.x+"&m="+value.m);

export const reqPostRegister = (url,value)=> axios.post(url,null,{params:value});

export const reqPostLogin = (url,value)=> axios.post(url,null,{params:value});
