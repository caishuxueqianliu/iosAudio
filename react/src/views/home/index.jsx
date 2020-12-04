import React from 'react'
import "./index.less"
import { Table,Button,message,Modal } from 'antd';
import { Input } from 'antd';
const { TextArea } = Input;
import { UploadOutlined } from '@ant-design/icons';
import {reqGetCookie, reqGetList, reqPostLogin,reqUpdate} from '../../api/iosaudit'
import '../request/xlsx.js'
import XLSX from 'xlsx'
export default class Index  extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            list: [],
            params: [],
            apis:[],
            loading:true,
            file: "",
            confc: {},
            confk: [],
            confv: [],
            confs: [],
            confs1: "",
            id:'',
            isModalVisible:false

        }
    }
    file= async(f)=>{
        if(!f){
            return
        }
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
            // var endRow = fromTo[1].charCodeAt(0);
            // var endLine = parseInt(fromTo[1].substr(1));
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

            await this.showModal()

        },1000)
    }
    // upload1=async (item)=>{
    //      await this.upload()
    //     let fromData = new FormData()
    //     fromData.append("id",item)
    //     fromData.append("config_host",this.state.confc.LaunchAdd)
    //     fromData.append("package_name",this.state.confc.GameName)
    //     fromData.append("game_version",this.state.confc.GameVersion)
    //     fromData.append("identifierd",this.state.confc.Identifier)
    //     fromData.append("channel",this.state.confc.Channel)
    //     fromData.append("channel_code",this.state.confc.ChannelCode)
    //   // await reqUpdate(fromData)
    //   //   await this.click2()
    // }
    upload2=async (item)=>{
       // console.log((typeof(item)))
        let fromData = new FormData()
        if(typeof(item)=="string"){
            fromData.append("id",item)
        }else if(typeof(item)=="object") {
            console.log(this.state.list.length)
            console.log((this.state.list.length)+1)
            fromData.append("id",'create')
        }
        else {
            return
        }

        if(this.state.list.lenght<69){
            return
        }

        fromData.append("config_host",this.state.confc.LaunchAdd)
        fromData.append("package_name",this.state.confc.GameName)
        fromData.append("game_version",this.state.confc.GameVersion)
        fromData.append("identifierd",this.state.confc.Identifier)
        fromData.append("channel",this.state.confc.Channel)
        fromData.append("channel_code",this.state.confc.ChannelCode)

       reqUpdate(fromData).then(()=>{
           message.success('上传成功')
            this.click2()
           this.setState({id:''})
       }).catch(()=>{
           message.success('上传成功')
           this.click2()
           this.setState({id:''})
       })

    }

    onChange= async (info)=>{
        await this.setState({file:info.target.files[0]})
        await this.file(this.state.file)

    }
    upload=(id)=>{
        if(id){
            this.setState({id:id})
        }
        this.refs.inputRef.click()
    }
    click1= async ()=>{
      //  console.log(1)
        await reqGetCookie()
    }
    click3= async ()=>{
        let formData = new FormData()
        formData.append('password',"xuegao666")
        await reqPostLogin(formData)
    }
    click2= async ()=>{
      //  console.log(2)
      const {data} =  await  reqGetList()
        this.setState({list:data})
        let ListArr=[]
        let apisArr=[]
        for(var i=0;i<data.length;i++){
            data[i].params.key = data[i].params.id
            data[i].params.apis = data[i].apis
            ListArr.push(data[i].params)
            apisArr.push(data[i].apis)
        }
         this.setState({params:ListArr})
        this.setState({apis:apisArr})
        this.setState({loading:false})
    }
    formatJson=(string) =>{
       //  let string1 = JSON.parse(string);//将json字符串格式化为json对象
        // JSON.stringify(string, null, "\t")
      // console.log(JSON.stringify(string, null, "\t"))
    return JSON.stringify(string, null, "\t")
    }
    async componentDidMount() {
      await  this.click1()
      await  this.click3()
      await  this.click2()
    }
    link=(id)=>{
       // console.log(id)
        window.open("http://iosaudit.xuegaogame.com/public/officeweb.php?config="+id)
      //  window.location.href="http://iosaudit.xuegaogame.com/public/officeweb.php?config="+id
    }
    showModal = () => {
        this.setState({isModalVisible:true})
    };

    handleOk =async () => {
        await  this.upload2(this.state.id)
        this.setState({isModalVisible:false})
    };

    handleCancel = () => {
        this.setState({isModalVisible:false})
    };
    render() {
        const columns = [
            { title: 'Id', dataIndex: 'id', key: 'id' },
            { title: 'channelCode', dataIndex: 'channel_code', key: 'channel_code' },
            { title: '游戏名称', dataIndex: 'package_name', key: 'package_name' },
            { title: '审核服区服渠道', dataIndex: 'channel', key: 'channel' },
            { title: '版本号', dataIndex: 'game_version', key: 'game_version' },
            { title: '上传时间', dataIndex: 'create_time', key: 'create_time' },
            {
                title: '修改',
                dataIndex: '',
                key: 'x',
                render: (item) => <a onClick={()=>this.upload(item.id)}>修改</a>
            },
            // {
            //     title: '复制',
            //     dataIndex: '',
            //     key: 'y',
            //     render: () => <a>复制</a>
            // },
            {
                title: '官网',
                dataIndex: '',
                key: 'y',
                 render: (item) => <a onClick={()=>this.link(item.id)}>官网</a>
               // render: (item) => <a href={"http://iosaudit.xuegaogame.com/public/officeweb.php?config="+item.id}>官网</a>
            }
        ];
        return (
            <div>
                <Modal
                    title="确认框"
                    visible={this.state.isModalVisible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <p>请确认是否上传。。</p>
                </Modal>
                <input type="file" onChange={this.onChange} hidden ref={"inputRef"} accept={".xls"}/>
                <Button icon={<UploadOutlined/>} onClick={this.upload} style={{marginBottom:10}}>上传</Button>
                <Table
                    columns={columns}
                    loading={this.state.loading}
                   // pagination={{ pageSize: 10 }}
                    expandable={{
                        expandedRowRender: record =>
                            <TextArea rows={15} value={this.formatJson(record.apis)}>
                            </TextArea>
                    }}
                    dataSource={this.state.params}
                />

            </div>
             )
    }
}

