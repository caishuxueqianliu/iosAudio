import React from 'react'
// import { UploadOutlined } from '@ant-design/icons';
export default class config extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gameini:""
        };
    }
    // componentWillReceiveProps(state){
    //     //获取父组件最新的taskList，更新子组件的taskList
    //     this.setState({
    //         gameini:state.gameini
    //     })
    // }
    render() {
        return (
            <div className={"config"}>
               {/*{this.state.gameini}*/}
                {/*<input type="file" onChange={this.onChange} hidden ref={"inputRef"}/>*/}
                {/*<Button icon={<UploadOutlined />} onClick={this.upload}>请选择config表</Button>*/}
                {/*<Divider orientation="left" onClick={this.copy}>game.ini</Divider>*/}
                {/*<List className={"list"}*/}
                {/*      size="large"*/}
                {/*      bordered*/}
                {/*      dataSource={this.state.confs}*/}
                {/*      renderItem={item => <List.Item>{item}</List.Item>}*/}
                {/*/>*/}
            </div>
        );
    }
}
