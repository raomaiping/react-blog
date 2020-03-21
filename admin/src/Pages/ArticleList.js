import '../static/css/ArticleList.css'
import React, { useState, useEffect } from "react";
import { List, Row, Col, Modal, message, Button } from "antd";
import axios from "../config/http";
import servicePath from "../config/apiUrl";
const { confirm } = Modal;
const getLocalTime =(nS)=> {     
  return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');     
}
function ArticleList(props) {
  const [list, setList] = useState([]);

  //得到文章列表
  const getList = () => {
    axios.get(servicePath.getArticleList).then(res => {
      setList(res.data.data);
    });
  };
  //删除文章的方法
  const delArticle = (id)=>{
    confirm({
      title:'确定要删除这篇博客文章吗？',
      content:'如果你点击ok按钮,文章将永远被删除，无法恢复',
      onOk(){
        axios.delete(servicePath.delArticle+id).then(
          res=>{
            console.log(res);
            
            message.success("文章删除成功")
            getList()
          }
        )
      },
      onCancel(){
        message.success('文章没有任何变化')
      }
    })
  }

  //修改文章的跳转方法
  const updateArticle = (id,checked) =>{
    props.history.push('/index/add/'+id)
  }

  useEffect(() => {
    getList();
  }, []);
  return (
    <>
      <List
        header={
          <Row className="list-div">
            <Col span={8}>
              <b>标题</b>
            </Col>
            <Col span={4}>
              <b>类别</b>
            </Col>
            <Col span={4}>
              <b>发布时间</b>
            </Col>
            <Col span={4}>
              <b>浏览量</b>
            </Col>

            <Col span={4}>
              <b>操作</b>
            </Col>
          </Row>
        }
        bordered
        pagination={{
          pageSize: 8,
          showQuickJumper:true,
          hideOnSinglePage:true
        }}
        dataSource={list}
        renderItem={item => (
          <List.Item>
            <Row className="list-div">
              <Col span={8}>{item.title}</Col>
              <Col span={4}>{item.typeName}</Col>
              <Col span={4}>{getLocalTime(item.addTime)}</Col>
              <Col span={4}>{item.view_count}</Col>
              <Col span={4}>
                <Button type="primary" onClick={()=>{updateArticle(item._id)}}>修改</Button>&nbsp;
                <Button onClick={()=>{delArticle(item._id)}}>删除 </Button>
              </Col>
            </Row>
          </List.Item>
        )}
      />
    </>
  );
}

export default ArticleList;
