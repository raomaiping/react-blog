import {Avatar,Divider} from 'antd'
import { GithubOutlined,QqOutlined,WechatOutlined} from '@ant-design/icons';
import '../public/style/components/author.css'
const Author = ()=>{
    return (
        <div className="author-div comm-box">
            <div><Avatar size={100} src="http://blogimages.jspang.com/blogtouxiang1.jpg" /></div>
            <div className="author-introduction">
                前端小菜鸟吖！一个菜鸟级别的前端程序员
                <Divider>社交账号</Divider>
                <Avatar size={28} icon={<GithubOutlined />} className="account" />
                <Avatar size={28} icon={<QqOutlined />} className="account" />
                <Avatar size={28} icon={<WechatOutlined />} className="account" />
            </div>
        </div>
    )
}

export default Author