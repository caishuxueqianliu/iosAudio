import React from 'react'
import './index.less'
import { Layout, Menu } from 'antd';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
const { Header, Content, Sider } = Layout;
import Home from '../home'
import Login from '../login'
import Record from '../record'
import Response from '../response'
import Xgcrypt from '../xgcrypt'
import Request from '../request'
import Share from '../share'
// import { BrowserRouter as Router, Link, Route, Redirect,Switch } from 'react-router-dom';
import { Route, Redirect,withRouter,Switch ,Link } from 'react-router-dom';
class index extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            home:1,
            xgcrypt:2,
            record:3,
            request:4,
            response:5,
            share:6

        };
    }
   async componentDidMount() {
          //  console.log(this.props.location.pathname)

    }

    render() {
        return (

            <div className={"index"}>

                <Layout>
                    <Sider
                        breakpoint="lg"
                        collapsedWidth="0"
                    >
                        <div className="logo" />

                        <Menu theme="dark" mode="inline" defaultSelectedKeys={this.props.location.pathname || '/home'}>
                                <Menu.Item key="/home" icon={<UserOutlined />}>
                                    <Link to="home" className={"link"}>
                                    包列表
                                    </Link>
                                </Menu.Item>
                            <Menu.Item key="/record" icon={<VideoCameraOutlined />}>
                                <Link to="record">
                                    包记录
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="/response" icon={<UploadOutlined />}>
                                <Link to="response">
                                    响应日志
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="/request" icon={<UserOutlined />}>
                                <Link to="request">
                                包测试
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="xgcrypt" icon={<UploadOutlined />}>
                                <Link to="/xgcrypt">
                                    xgcrypt
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="/share" icon={<UserOutlined />}>
                                <Link to="share">
                                   资源分享
                                </Link>
                            </Menu.Item>

                        </Menu>

                    </Sider>
                    <Layout>
                        <Header className="site-layout-sub-header-background" style={{ padding: 0 }} >
                          <p className={'pp'}>中转服后台</p>
                        </Header>
                        <Content style={{ margin: '24px 16px 0' }}>
                            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>

                                <Switch>
                                    <Route path="/home" component={Home}/>
                                    <Route path="/record" component={Record}/>
                                    <Route path="/login" component={Login}/>
                                    <Route path="/response" component={Response}/>
                                    <Route path="/request" component={Request}/>
                                    <Route path="/xgcrypt" component={Xgcrypt}/>
                                    <Route path="/share" component={Share}/>
                                    <Redirect to="/home"/>
                                </Switch>

                            </div>
                        </Content>

                    </Layout>
                </Layout>
            </div>

        );
    }
}
export default withRouter(index)
