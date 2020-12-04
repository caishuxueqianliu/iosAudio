import React from 'react'
import { Collapse } from 'antd';
import { Modal, Button, Input, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import './index.less'
import { VerticalAlignBottomOutlined } from '@ant-design/icons';
import { Tag } from 'antd';
const { Panel } = Collapse;
import { Select } from 'antd';
const { Option } = Select;
import { reqUpload, reqGetList } from "../../api/api"

export default class index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name:"",
            arr:[],
            arr1:[],
            arr2:[],
            arr3:[],
            showArr:[],
            isModalVisible:false,
            fileType:"",
            file:""

        };
    }
    async componentDidMount() {

       await this.getList()
      await  this.showArrAll()
      await  this.refs.Refbtn1.click()
    }
    getList =async()=>{
        const {data}= await reqGetList()
      //  console.log(data.data)
      this.setState({arr:data.data.reverse()})
    }

    callback=(key)=> {
        console.log(key);
    }
    download=(item)=>{
        const {_id,filename,extname}=item
       return (
           <div onClick={event => {
               event.stopPropagation()
               //console.log(name)
               window.location.href="/api1/upload/"+_id+extname
           }} >
           <span style={{marginRight:20}}>{filename}</span>
           <VerticalAlignBottomOutlined/>
           </div>
    )

    }
    showModal = () => {
        this.setState({isModalVisible:true})
    };

    handleOk =async () => {
        // console.log(this.refs.filenameRef.state.value)
        // console.log(this.refs.desRef.state.value)
        // console.log(this.refs.useRef.state.value)
        // console.log(this.refs.userRef.state.value)
        let formData = new FormData()
        formData.append('filename',this.refs.filenameRef.state.value)
        formData.append('type',this.state.fileType)
        formData.append('des',this.refs.desRef.state.value)
        formData.append('use',this.refs.useRef.state.value)
        formData.append('user',this.refs.userRef.state.value)
        formData.append('file',this.state.file)
        // formData.append('file',this.refs.userRef.state.value)
      //  console.log(this.refs.fileRef.files[0])

        //请求前判断
        if(!this.refs.filenameRef.state.value){
            message.error("文件名不能为空！")
        }
        else if(!this.state.fileType){
            message.error("请选择文件所属分类！")
        }else if(!this.refs.desRef.state.value){
            message.error("请输入文件描述！")
        }else if(!this.refs.useRef.state.value){
            message.error("请输入文件使用方法！")
        }else if(!this.refs.userRef.state.value){
            message.error("请输入上传者信息！")
        }else if(!this.state.file){
            message.error("请选择上传的文件！")
        }else if(this.state.file.size>1024*1024*10){
            message.error("请选择小于10m的文件！")
        }
        else{

            await reqUpload(formData)
            console.log('ok')
            this.refs.filenameRef.state.value=""
           // this.setState({fileType:null})
          // console.log(this.refs.typeRef)
           this.refs.desRef.state.value=''
            this.refs.useRef.state.value=''
            this.refs.userRef.state.value=''
            this.setState({file:""})
            this.setState({name:""})
           // this.setState({isModalVisible:false})
            // this.setState({isModalVisible:false})
            // this.setState({isModalVisible:false})
            // this.setState({isModalVisible:false})
           this.getList()
            this.setState({isModalVisible:false})
        }


    }
    onSelect=(value)=>{
        console.log(value)
        if(!value){
            return
        }
        this.setState({fileType:value})
    }

    handleCancel = () => {
        this.setState({isModalVisible:false})
    };
    upload= () =>{
        this.refs.fileRef.click()
    }
    fileChange= () =>{
       console.log(this.refs.fileRef.files[0])
        this.setState({file:this.refs.fileRef.files[0]})
        this.setState({name:this.refs.fileRef.files[0].name})
    }
    showArrAll=()=>{
        this.setState({showArr:this.state.arr})
    }
    showArr1= async ()=>{
        let arr=[]
      await  this.state.arr.forEach(item=>{
            if(item.type=="1"){
                arr.push(item)
            }
          this.setState({arr1:arr})
        })
       await this.setState({showArr:this.state.arr1})
    }

    showArr2=async ()=>{
        let arr=[]
        await  this.state.arr.forEach(item=>{
            if(item.type=="2"){
                arr.push(item)
            }
            this.setState({arr2:arr})
        })
        this.setState({showArr:this.state.arr2})
    }

    showArr3=async()=>{
        let arr=[]
        await  this.state.arr.forEach(item=>{
            if(item.type=="3"){
                arr.push(item)
            }
            this.setState({arr3:arr})
        })
        this.setState({showArr:this.state.arr3})
    }


    render() {
        return (
            <div className={"index"}>
                <Modal
                    title="Basic Modal"
                    visible={this.state.isModalVisible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <Input placeholder="文件名" style={{ width: 472, marginBottom:20}} ref={"filenameRef"} size={"large"}/>
                    <Select placeholder="文件类型" style={{ width: 472,marginBottom:20 }} size={"large"} onSelect={this.onSelect} ref={"typeRef"}>
                        <Option value="1" size={"large"}>打包参数</Option>
                        <Option value="2" size={"large"}>人审界面</Option>
                        <Option value="3" size={"large"}>脚本/其他</Option>
                    </Select>
                    <Input placeholder="描述" size={"large"} style={{ width: 472, marginBottom:20}} ref={"desRef"} />
                    <Input placeholder="使用方法" size={"large"}  style={{ width: 472, marginBottom:20}} ref={"useRef"}/>
                    <Input placeholder="上传者" size={"large"} ref={"userRef"}   style={{ width: 472, marginBottom:20}}/>
                    <input type="file" ref={"fileRef"} hidden onChange={this.fileChange}/>
                    <Button icon={<UploadOutlined />} onClick={this.upload} style={{  marginRight:20}}>Click to Upload</Button>
                    <span>{this.state.name ? this.state.name : ""}</span>
                </Modal>
                <Button icon={<UploadOutlined />} style={{marginBottom:10}} onClick={this.showModal}>Click to Upload</Button>
                <Button ref={'Refbtn1'} onClick={this.showArrAll}>显示全部</Button>
                <Button onClick={this.showArr1}>打包参数</Button>
                <Button onClick={this.showArr2}>人审界面</Button>
                <Button onClick={this.showArr3}>脚本/其他</Button>
                <Collapse  onChange={this.callback} style={{width:"60rem"}}>
                    {this.state.showArr.map((item,index)=>{
                     return( <Panel header={item.des} key={index} extra={this.download(item)} >
                         <Tag color="success">相关信息</Tag>
                            <p>说明：{item.use}</p>
                            <p>上传时间：{this.$moment(item.create_time).format('YYYY-MM-DD HH:MM:SS')}</p>
                         <Tag color="success">上传用户</Tag>
                            <p>{item.user}</p>
                        </Panel>)
                    })}
            </Collapse>

            </div>
        );
    }
}
