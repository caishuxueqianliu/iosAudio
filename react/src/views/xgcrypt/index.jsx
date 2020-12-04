import React from 'react'
import { Select } from 'antd';
const { Option } = Select;
import { Button } from 'antd';
import { Input } from 'antd';
const { TextArea } = Input;
import './index.less'
import md5Json from  "./extra/dfs/md5dfs"
import { message } from 'antd';
import { Tag } from 'antd';
import crypt from './crypt'
export default class index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            json:[],
            directKey:"",
            filePath:"",
            FileName:"",
            isDir:"",
            DirPath:"",
            textInput:"",
            textOutput:""
        };
    }
    componentDidMount() {
        this.loadAll()
    }

    onChange2=(value)=> {
        this.setState({filePath:value})
    }

     onBlur=() =>{
       // console.log('blur');
    }

    onFocus=() =>{
     //   console.log('focus');
    }

    onSearch=(val) =>{
      console.log('search:', val);
    }

    submit=async () =>{
       await this.setState({directKey:this.refs.directKeyRef.state.value})
        if(this.state.directKey=="" || this.state.filePath==""){
            message.error("directKey或filePath不能为空")
        }
        else{
            this.getFileName()
        }

    }
    loadAll() {
        var arr=[]
        for(var i in md5Json){
            arr.push({ "value": md5Json[i]})

        }
       this.setState({json:arr})
    }
    getFileName=()=>{
        var str= this.state.filePath
        str= str.split('/')
        console.log(str)
        if(str.length>1){
            this.setState({isDir:true})
            this.setState({FileName:this.$md5(str[str.length-1])})
            if(this.state.directKey!=""){
                this.setState({FileName:this.$md5(this.state.FileName+this.state.directKey)})
            }
            else if(this.state.directKey==""){
                this.setState({FileName:this.$md5(this.state.FileName)})
            }
            str.pop();
            this.setState({DirPath:this.$md5(str.join("/"))})
            if(this.state.directKey!=""){
                this.setState({DirPath:this.$md5(this.state.DirPath+this.state.directKey)})
            }
            else if(this.state.directKey==""){
                this.setState({FileName:this.$md5(this.state.FileName)})
            }
        }
        else if(str.length==1){
            this.setState({isDir:false})
            this.setState({FileName:this.$md5(str[0])})
            if(this.state.directKey!=""){
                this.setState({FileName:this.$md5(this.state.FileName+this.state.directKey)})
            }
            else if(this.state.directKey==""){
                this.setState({FileName:this.$md5(this.state.FileName)})

            }
            this.setState({DirPath:"null"})
        }
    }

    replacex= async()=>{
        await this.setState({textInput:this.refs.textInputRef.state.value})
       await this.setState({textInput:this.state.textOutput})
        await this.setState({textOutput:""})
        this.refs.textInputRef.state.value =this.state.textInput
    }
    decode=async ()=>{
        await this.setState({textInput:this.refs.textInputRef.state.value})
      await  this.setState({textOutput:decodeURIComponent(this.state.textInput)})
    }
    encode=async ()=>{
        await this.setState({textInput:this.refs.textInputRef.state.value})
       await this.setState({textOutput:encodeURIComponent(this.state.textInput)})
    }
    deaes= async ()=>{
        await this.setState({textInput:this.refs.textInputRef.state.value})
      await  this.setState({textOutput:crypt.decrypt(this.state.textInput)})
    }
    enaes=async ()=>{
        await this.setState({textInput:this.refs.textInputRef.state.value})
       await this.setState({textOutput:crypt.encrypt(this.state.textInput)})
    }
    md5=async ()=>{
        await this.setState({textInput:this.refs.textInputRef.state.value})
        await this.setState({textOutput:this.$md5(this.state.textInput)})
    }
    formatJson=async ()=>{
        await this.setState({textInput:this.refs.textInputRef.state.value})
        var json = this.state.textInput;
        try{
            json = JSON.parse(json);//将json字符串格式化为json对象
            JSON.stringify(json, null, "\t")
            this.setState({textOutput:JSON.stringify(json, null, "\t")})
        }
        catch (e) {
            message.error("未识别到json格式")
        }
    }

    render() {
        return (
            <div className={"index"}>
                <div className={"input"}>
                <Input placeholder="设置directKey" size="large"  ref={"directKeyRef"}/>
                <Select
                    size="large"
                    showSearch
                    placeholder="选择文件"
                    optionFilterProp="children"
                    onChange={this.onChange2}
                    onFocus={this.onFocus}
                    onBlur={this.onBlur}
                    onSearch={this.onSearch}
                    filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    {this.state.json.map((item,index)=>{
                        return <Option key={index} value={item.value}>{item.value}</Option>
                    })
                    }
                </Select>
                <Button type="primary" size="large" onClick={this.submit}>文件名加密</Button>
                </div>
                <div className={"output"}>


                    <Tag color="success">加密后的文件名</Tag>
                    <span>   {this.state.FileName}</span>
                    <Tag color="warning">加密后的目录名</Tag>
                    <span>   {this.state.DirPath}</span>

                </div>

                <div className={"Aes"}>
                    <TextArea rows={6}    ref={"textInputRef"}/>
                    <div className={"button"}>
                    <Button type="primary" size="large" onClick={this.decode}>urlcode解码</Button>
                    <Button type="primary" size="large" onClick={this.encode}>urlcode编码</Button>
                    <Button type="primary" size="large" onClick={this.enaes}>aes加密</Button>
                    <Button type="primary" size="large" onClick={this.deaes}>aes解密</Button>
                    <Button type="primary" size="large" onClick={this.formatJson}>json格式化</Button>
                    <Button type="primary" size="large" onClick={this.md5}>md5加密</Button>
                    {/*<Button  size="large" onClick={this.replacex}>输出转输入</Button>*/}
                    </div>
                    <TextArea rows={6} value={this.state.textOutput}/>
                </div>
            </div>
        );
    }
}
