import { Avatar, Divider, Tooltip } from "antd";
import { GithubOutlined, QqOutlined, WechatOutlined } from "@ant-design/icons";
import "../public/style/components/author.css";
const Author = () => {
  return (
    <div className="author-div comm-box">
      <div>
        <Avatar
          size={100}
          src="http://q1.qlogo.cn/g?b=qq&nk=2582395486&s=640"
        />
      </div>
      <div className="author-introduction">
        一个菜鸟级别的前端程序员
        <Divider>社交账号</Divider>
        <Tooltip
          placement="top"
          title="https://github.com/raomaiping"
          onClick={() =>
            (window.location.href = "https://github.com/raomaiping")
          }
        >
          <Avatar size={28} icon={<GithubOutlined />} className="account" />
        </Tooltip>
        <Tooltip placement="top" title="2582395486">
          <Avatar size={28} icon={<QqOutlined />} className="account" />
        </Tooltip>
        <Tooltip placement="top" title="Raomaiping980408">
          <Avatar size={28} icon={<WechatOutlined />} className="account" />
        </Tooltip>
      </div>
    </div>
  );
};

export default Author;
