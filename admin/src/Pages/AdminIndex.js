import React, { useState } from "react";
import { Layout, Menu, Breadcrumb } from "antd";
import "../static/css/AdminIndex.css";
import ArticleList from "./ArticleList";
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined
} from "@ant-design/icons";
import { Route, Router } from "react-router-dom";
import AddArticle from "./AddArticle";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

function AdminIndex(props) {
  const [collapsed, setCollapsed] = useState(false);

  const handleClickArticle = e => {
    if (e.key == "addArticle") {
      props.history.push("/index/add");
    } else {
      props.history.push("/index/list");
    }
  };

  const onCollapse = collapsed => {
    setCollapsed(collapsed);
  };
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          <Menu.Item key="1">
            <PieChartOutlined />
            <span>工作台</span>
          </Menu.Item>
          <Menu.Item key="2">
            <DesktopOutlined />
            <span>添加文章</span>
          </Menu.Item>
          <SubMenu
            key="sub1"
            onClick={handleClickArticle}
            title={
              <span>
                <UserOutlined />
                <span>文章管理</span>
              </span>
            }
          >
            <Menu.Item key="addArticle">添加文章</Menu.Item>
            <Menu.Item key="articleList">文章列表</Menu.Item>
          </SubMenu>
          <Menu.Item key="9">
            <FileOutlined />
            留言管理
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>后台管理系统</Breadcrumb.Item>
            <Breadcrumb.Item>工作台</Breadcrumb.Item>
          </Breadcrumb>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            <div>
              <Route path="/index/" exact component={AddArticle} />
              <Route path="/index/add/" exact component={AddArticle} />
              <Route path="/index/list" exact component={ArticleList} />
              <Route path="/index/add/:id" exact component={AddArticle} />
            </div>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>raomaiping.xyz ©2020</Footer>
      </Layout>
    </Layout>
  );
}

export default AdminIndex;
