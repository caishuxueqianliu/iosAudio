/*eslint-disable*/
import React from 'react'
import { Upload, message, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import './xlsx'
import XLSX from 'xlsx'
import { List, Typography, Divider } from 'antd';
// import  {copyText} from '../../utils/copy'
import { Steps } from 'antd';
const { Step } = Steps;
import './index.less'
// import Config from './components/config'
import {reqPostInfo,reqGetSeverList,reqPostRegister,reqPostLogin} from '../../api/request'
import crypt from '../xgcrypt/crypt'

export default class index extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            file: "",
            confc: {},
            confk: [],
            confv: [],
            confs: [],
            confs1: "",
            wb: "",
            current: 0,
            isdisabled:true,
            info:{
                info:"",
                deinfo:"",
                x:'',
                dex:""
            },
            server:{
                de:"",
                en:""
            },
            login:{
                ret:"",
                url:""
            },
            register:{
                ret:"",
                url:""
            }

        }
        this.steps= [
            {
                title: "开始测试1",
                content: '准备中。。。'
            },
            {
                title: '请求配置中心',
                content: "准备中。。。"
            },
            {
                title: '登陆注册',
                content: 'Last-content',
            },
            {
                title: '获取区服',
                content: 'Last-content',
            },
            {
                title: '其他',
                content: 'Last-content',
            },
        ]
    }

    file= async(f)=>{
        if(!f){
            return
        }
        var k=[];
        var v=[];
        var c={};
       // var f=this.state.file
        var reader = new FileReader();
        await reader.readAsBinaryString(f);
        reader.onload =  await function(e) {
            var data = e.target.result;
            var   wb =    XLSX.read(data, {
                type: 'binary'
            });

            var seltext=wb.SheetNames[0]

            var conf={};

            var curSheet = wb.Sheets[seltext];
            // 表格的表格范围，可用于判断表头是否数量是否正确
            var fromTo = curSheet['!ref'];
            fromTo = fromTo.split(":");

            var startRow = fromTo[0].charCodeAt(0);
            var startLine = parseInt(fromTo[0].charAt(1));
            var endRow = fromTo[1].charCodeAt(0);
            var endLine = parseInt(fromTo[1].substr(1));
            // console.log(startLine)
            //   console.log(endLine)
            for (var line = startLine; line < 260; line++){
                var key = null;
                var keyrow = startRow;
                // console.log(startRow)
                // console.log(endRow)

            for (var row = 65; row < 71; row++){
                    var cell = String.fromCharCode(row) + line;
                    var cellStr = curSheet[cell];

                    // console.log(cell)
                    // console.log(cellStr)

                    if (cellStr && cellStr.w && cellStr.w.length > 0) {
                        if(key  && row == keyrow+1){
                            // console.log(cellStr)
                            conf[key] = cellStr.w;
                            break;
                        }else{
                            key = cellStr.w;
                            keyrow = row;
                        }
                    }
                }
            }
            //  console.log(conf)
            var confv=[];
            for (var i in conf){
                confv.push(conf[i]);
            }

            c=conf;
       //   console.log(c)
        }
        setTimeout(async ()=>{
            await this.setState({confc:c})
            await this.setState({confk:Object.keys(c)})
            await this.setState({confv:Object.values(c)})
            let arr=[]
            for(var i=0;i<this.state.confk.length;i++) {
                arr.push(this.state.confk[i]+"="+this.state.confv[i])
            }
            await this.setState({confs:arr})
            await this.setState({confs1:arr.join("\n")})
            // this.refs.copyRef.state.value=arr
          //  console.log(this.refs.copyRef.state)
           // await this.config()
            this.setState({isdisabled:false})
            await  this.reqInfo()
        },500)

       // setTimeout(()=>{this.setState({confk:k}),this.setState({confv:v}),this.setState({conf:c})}, 500)
    }
    onChange= async (info)=>{
       await this.setState({file:info.target.files[0]})
       await this.file(this.state.file)

    }
    upload=()=>{
        this.refs.inputRef.click()
    }

    copy=()=>{

    }
    next = async() => {
        if(this.state.current==0){
            await this.reqGetServer()
        }
        else if(this.state.current==1){
            await this.reqRegister()
        }
        this.steps= [
            {
                title: "开始测试",
                content: '准备中。。。'
            },
            {
                title: '请求配置中心',
                content: <div>
                    <p>url:{this.state.confc.LaunchAdd}</p>
                    <p>methods:post</p>
                    {/*<p>params:{JSON.stringify(this.state.info.info)}</p>*/}
                    <p>params(明文):{JSON.stringify(this.state.info.deinfo)}</p>
                    {/*<p>服务器返回:{this.state.info.x}</p>*/}
                    <p>服务器返回(明文):{JSON.stringify(this.state.info.dex)}</p>
                </div>
            },
            {
                title: '获取区服',
                content: <div>
                    <p>url:{this.state.server.url}</p>
                    <p>methods:GET</p>
                    {/*<p>params:{JSON.stringify(this.state.server.p)}</p>*/}
                    <p>params(明文):{this.state.server.p1}</p>
                    {/*<p>服务器返回:{JSON.stringify(this.state.server.en)}</p>*/}
                    <p>服务器返回(明文):{this.state.server.de}</p>
                </div>
            },
            {
                title: '登陆注册',
                content:
                    <div>
                    <p>url:{this.state.register.url}</p>
                  <p>methods:Post</p>
                   <p>服务器返回:{this.state.register.ret}</p>
                   <p>url:{this.state.register.url}</p>
                  <p>methods:Post</p>
                    <p>服务器返回:{this.state.login.ret}</p>
                </div>
            },
            {
                title: '其他',
                content: "ok"
            },
        ]
       this.setState({current:this.state.current+1});
        }
    prev = () => {
           this.setState({current:this.state.current-1});
        }
    done = async() =>{
        message.success('Processing complete!')
       await this.setState({current:0})
       await this.setState({confc:""})
      await  this.setState({isdisabled:true})
        await  this.setState({file:""})
        this.refs.inputRef.value=""
    }
    reqInfo = ()=>{
       var infom={"v":this.state.confc.GameVersion,"id":this.state.confc.Identifier}
        var cryptInfo=crypt.encrypt(JSON.stringify(infom));
        var encryptInfo=cryptInfo;
        var md5Info=this.$md5(JSON.stringify(infom));
        var  info={x:encryptInfo,m:md5Info};
        reqPostInfo(this.state.confc.LaunchAdd,info).then(async (data)=>{
            var infod=JSON.stringify(data.data.x);
            var decry=crypt.decrypt((data.data.x))
            var infomobj=JSON.parse(decry)
          await this.setState({info:
                     {
                         info:info,
                         deinfo:infom,
                         x:infod,
                         dex:infomobj
                     }})

        });

    }
    reqGetServer=()=>{
        var p={x:encodeURIComponent((crypt.encrypt("common"))),m:this.$md5("common")};
        let serverUrl = "http://"+this.state.info.dex.s+"/master/serverlist";
        reqGetSeverList(serverUrl,p).then(data=>{
            this.setState({server:{url:serverUrl,p:p,p1:"common",en:data.data,de:crypt.decrypt(data.data.x)}})
        })
    }
    reqRegister=async ()=>{

        let usr = '';
        let pwd= '';
        for(let i =0;i<8;i++){
            usr += String.fromCharCode(Math.floor(Math.random()*26+65))
            pwd += String.fromCharCode(Math.floor(Math.random()*26+65))
        }
        let loginreq={"u":usr,"p":pwd,"channelCode":this.state.confc.ChannelCode}
        let registerreq={"u":usr,"p":pwd,"channelCode":this.state.confc.ChannelCode};
          let registerUrl="http://"+this.state.info.dex.l+"/user/register";
            let loginUrl="http://"+this.state.info.dex.l+"/user/login";
     await   reqPostRegister(registerUrl,loginreq).then(data=>{
            this.setState({login: {ret:data.data.ret,url:loginUrl}})
        })

        await    reqPostLogin(loginUrl,registerreq).then(data=>{
                this.setState({register:{ret:data.data.ret,url:registerUrl}})
            })




    }
    render() {

        return (
            <div className={"index"} style={{marginRight:40}}>
                <div className={"top"}>
                <Button icon={<UploadOutlined />} onClick={this.upload} style={{marginTop:0}}>请选择config表</Button>
                    <div className="steps-action" style={{marginTop:0}}>
                        {this.state.current < this.steps.length - 1 && (
                            <Button type="primary" onClick={() => this.next()} disabled={this.state.isdisabled}>
                                Next
                            </Button>
                        )}
                        {this.state.current === this.steps.length - 1 && (
                            <Button type="primary" onClick={() => this.done()}>
                                Done
                            </Button>
                        )}
                        {this.state.current > 0 && (
                            <Button style={{ margin: '0 8px' }} onClick={() => this.prev()}>
                                Previous
                            </Button>
                        )}
                    </div>
                </div>

                <Steps current={this.state.current} >
                    {this.steps.map(item => (
                        <Step key={item.title} title={item.title} />
                    ))}
                </Steps>
                <div className="steps-content" style={{fontSize:16,color:'green'}}><span>{this.steps[this.state.current].content}</span></div>

                {/*<Input type="text"  ref={"copyRef"}  />*/}
                <input type="file" onChange={this.onChange} hidden ref={"inputRef"} accept={".xls"}/>

                <Divider orientation="left" onClick={this.copy}>game.ini</Divider>
                <List className={"list"}
                      size="large"
                      bordered
                      dataSource={this.state.confs}
                      renderItem={item => <List.Item>{item}</List.Item>}/>
            </div>
        );
    }
}
