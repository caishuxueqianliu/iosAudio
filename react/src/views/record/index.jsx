import React from 'react'
import "./index.less"
import { Table } from 'antd';
import NProgress from 'nprogress' // Progress 进度条
// import { reqGetCookie, reqPostLogin, reqPostRecord } from '../../api/iosaudit'
import { reqPostRecord } from '../../api/iosaudit'
import { Input } from 'antd';
import { Switch } from 'antd';
const { Search } = Input;
export default class Index  extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            list: [],
            loading: true,
            search: "",
            isus: ""

        }
    }
    // click1= async ()=>{
    //     console.log(1)
    //     await reqGetCookie()
    //
    // }
    // click3= async ()=>{
    //     let formData = new FormData()
    //     formData.append('password',"xuegao666")
    //     await reqPostLogin(formData)
    //
    // }
    click2= async ()=>{
        NProgress.start()
        let list=[]
        let formData = new FormData()
        formData.append('search',this.state.search)
        if(this.state.isus){
            formData.append('isus',this.state.isus)
        }
        else {
            formData.delete('isus')
        }
        const {data} = await reqPostRecord(formData)
        for(var i=0;i<data.length;i++){
            data[i].key = data[i].id
            list.push(data[i])
        }
        this.setState({list:list})
        this.setState({loading:false})
        NProgress.done()
    }

   componentDidMount() {
        // await  this.click1()
        // await  this.click3()
         this.click2()
    }
   onSearch =  async (value) => {
       if(value){
         await  this.setState({search:value})
               this.click2()


       }else{
           await   this.setState({search:""})
          this.click2()
       }
   }
    showIp=  async (value) => {
        if(value){
            await    this.setState({isus:"on"})

            this.click2()
        }else{
            await    this.setState({isus:""})
            this.click2()

        }
    }


    render() {
        const columns = [
            { title: '记录Id', dataIndex: 'id', key: 'id' },
            { title: 'channelCode', dataIndex: 'channel_code', key: 'channel_code' },
            { title: '游戏名称', dataIndex: 'package_name', key: 'package_name' },
            { title: '行为', dataIndex: 'behavior', key: 'behavior' },
            { title: 'ip地址', dataIndex: 'ip', key: 'ip' },
            { title: '来源地', dataIndex: 'location', key: 'location' },
            { title: '访问时间', dataIndex: 'create_time', key: 'create_time' }
        ];
        return (
            <div className={'record'}>
                <div className={'record-top'}>
                <Search
                    placeholder="请输入[IP | GameName | ChannelCode]进行过滤"
                    allowClear
                    onSearch={this.onSearch}
                    style={{ width: 400,marginRight:"10px" }}
                />
                <Switch checkedChildren="只看美国ip开启" unCheckedChildren="只看美国ip关闭" onClick={this.showIp}    />
                </div>
                <Table
                    columns={columns}
                    loading={this.state.loading}
                   // pagination={{ pageSize: onchange }}
                    dataSource={this.state.list}
                />
            </div>
        )
    }
}

