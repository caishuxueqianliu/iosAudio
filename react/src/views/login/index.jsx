import React from 'react'
import Clock from './components/login'
import { Button } from 'antd';
export default class Login extends React.Component {

    render() {
        return (
            <div>
            <Button type="primary">Primary Button</Button>
            <Clock  date={new Date()}></Clock>
            </div>
    )
    }
}
