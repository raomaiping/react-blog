import React,{useState} from 'react';
import '../static/css/Login.css'
import {Card,Input,Button,Spin} from 'antd'
import { createFromIconfontCN } from '@ant-design/icons';
import 'antd/dist/antd.css'
function Login(){
    const IconFont = createFromIconfontCN({
        scriptUrl: '//at.alicdn.com/t/font_1694685_d4cx4au3fp.js',
      });
    const [userName,setUserName] = useState('')
    const [passWord,setPassWord] = useState('')
    const [isLoading,setIsLoading] = useState(false)

    const checkLogin = ()=>{
        setIsLoading(true)
        setTimeout(()=>{
            setIsLoading(false)
        },1000)
    }
    return(
        <div className="login-div">
            <Spin tip="Loading..." spinning={isLoading}>
                <Card title="大帅哥的博客后台" bordered={true} style={{width:400}}>
                    <Input 
                        id="userName"
                        size="large"
                        placeholder="Enter your userName"
                        prefix={<IconFont type="icon--MaleUser" />}
                        onChange={e=>{setUserName(e.target.value)}}
                    />
                    <br/><br/>
                    <Input.Password 
                        id="passWord"
                        size="large"
                        placeholder="Enter your passWord"
                        prefix={<IconFont type="icon-key" />}
                        onChange={e=>{setPassWord(e.target.value)}}
                    />
                    <br/><br/>
                    <Button type="primary" size="large" block onClick={checkLogin}>Login</Button>
                </Card>
            </Spin>
        </div>
    )
}
export default Login