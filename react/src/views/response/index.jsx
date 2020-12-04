import React from 'react'
import { reqGetResponse } from '../../api/iosaudit'
import "./index.less"
import { Calendar } from 'antd';
import { Spin } from 'antd';
import { BackTop } from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
import { Switch ,Button} from 'antd';
import NProgress from "nprogress";
export default class index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list:"",
            p:0,
            delArr:[],
            filterArr:[],
            timeStamp:new Date(((moment().local()).format('YYYY-MM-DD'))).getTime()/1000,
            moment:moment().local(),
            spinning:true,
            isfilter:true,
            showArr:[]||"暂无日志"
        };

    }
 onPanelChange= async (value)=> {
     //   console.log(value.format('YYYY-MM-DD'), mode);
     const timeStamp= new Date((value.format('YYYY-MM-DD'))).getTime()/1000
    // console.log(timeStamp)
    await this.setState({timeStamp:timeStamp})
    }
    onSelect= async (value)=> {
     //   console.log((value.format('YYYY-MM-DD')));
       const timeStamp= new Date((value.format('YYYY-MM-DD'))).getTime()/1000
       console.log(timeStamp)
        await  this.setState({timeStamp:timeStamp})
    }
    onChange= async (value)=> {
        //  console.log((value.format('YYYY-MM-DD')));
        const timeStamp= new Date((value.format('YYYY-MM-DD'))).getTime()/1000
       // console.log(timeStamp)
        await  this.setState({timeStamp:timeStamp})
        await this.setState({delArr:""})
        await this.setState({spinning:true})
        this.getResponse()
    }
    componentDidMount() {
        this.getResponse()

    }
    getResponse =async ()=>{
       // console.log(this.state.timeStamp)
        NProgress.start()
      await  this.setState({showArr:[]})
       let {data} = await reqGetResponse(this.state.timeStamp)
        await this.setState({list:data})
       // console.log(data.match(/访问官网/g).index)
       // data=data.substring(0,500)
        this.subString(data)
        await this.setState({spinning:false})
        NProgress.done()
    }

    subString=async (str)=>{
       //  var i =str.indexOf('访问官网')
       //  var j=str.substring(0,i).lastIndexOf("2020")
       //  let str1=str.substring(j,i+10)
       //  str=str.replace(str1,'')
       // await this.setState({p:this.state.p+i+12})
       //  if(i==(-1)){
       //      await this.setState({delArr:"<p>"+str+"</p>"})
       //       return
       //   }
       // else{
       //       this.subString(str)
       //   }
       str= str.split('<br><br>').reverse()
       // console.log(str)
       var newArr =   str.filter(item => item.indexOf('访问官网') < 0)
     // await this.setState({delArr:"<p>"+str+"</p>"})
       await this.setState({delArr:str})
       await this.setState({filterArr:newArr})
       await this.isfilterArr()
    }
    isfilterArr=()=>{
      //  await  this.setState({showArr:[]})
        if(this.state.isfilter){
            this.setState({showArr:this.state.filterArr})
        }
        else{
            this.setState({showArr:this.state.delArr})
        }
    }
     onChange1=async (checked)=> {

       await  this.setState({isfilter:checked})
         this.isfilterArr()

    }
    render() {
        return (
            <div className={"container"}>
                <div className={"top"}>
                <div className="site-calendar-demo-card">
            <Calendar  defaultValue={this.state.moment} onChange={this.onChange}  fullscreen={false} />
                </div>
                    <div className={"item"}>
                <Switch checkedChildren="过滤访问官网开启" style={{marginLeft:10,height:25}} unCheckedChildren="过滤访问官网关闭" defaultChecked onChange={this.onChange1} />
                <Button type="primary" onClick={this.getResponse} style={{marginLeft:10,marginTop:50}}>刷新列表</Button>
                    </div>
                </div>
                <Spin className={'spin'} spinning={this.state.spinning}/>
                    {/*<div className={"index"} dangerouslySetInnerHTML={{__html: this.state.delArr}}/>*/}
                {this.state.showArr.map((item,index)=>{
                    return (<p key={index} dangerouslySetInnerHTML={{__html: item}}></p>)
                })}
                <BackTop/>
            </div>
        );
    }
}
