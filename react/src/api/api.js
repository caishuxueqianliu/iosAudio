/*eslint-disable*/
import axios from 'axios'
const BASE = '/api1'

export const reqUpload= (formData)=> axios.post(BASE+"/upload/",formData)

export const reqGetList= ()=> axios.get(BASE+"/list/")
