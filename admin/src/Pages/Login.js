import React,{useState} from 'react';
import '../static/css/Login.css'
import {Card,Input,Button,Spin,message} from 'antd'
import { createFromIconfontCN } from '@ant-design/icons';
import 'antd/dist/antd.css'
import axios from '../config/http'
import servicePath from '../config/apiUrl'
import keys from '../config/keys'
function Login(props){
    const IconFont = createFromIconfontCN({
        scriptUrl: keys.iconUrl,
      });
    const [username,setUserName] = useState('')
    const [password,setPassWord] = useState('')
    const [isLoading,setIsLoading] = useState(false)

    const checkLogin = ()=>{
        setIsLoading(true)
        if(!username){
            message.error("用户名不能为空")
            setTimeout(()=>{
                setIsLoading(false)
            },500)
            return false
        }else if(!password){
            message.error('密码不能为空')
            setTimeout(()=>{
                setIsLoading(false)
            },500)
            return false
        }
        let dataProps = {
            'username':username,
            'password':password
        }
        axios.post(servicePath.login,dataProps)
        .then(res=>{
                setIsLoading(false)
                localStorage.setItem('eleToken',res.data.token)
                props.history.push('/index')
            }       
        )
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