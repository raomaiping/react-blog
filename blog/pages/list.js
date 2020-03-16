import React, { useState, useEffect } from "react";
import Head from "next/head";
import Header from "../components/Header";
import Author from "../components/Author";
import Advert from "../components/Advert";
import Footer from "../components/Footer";
import axios from "axios";
import servicePath from "../config/apiUrl";
import Link from "next/link";
import { Row, Col, List, Breadcrumb } from "antd";
import {
  CalendarOutlined,
  YoutubeOutlined,
  FireOutlined
} from "@ant-design/icons";
const Mylist = list => {
  const [mylist, setMylist] = useState(list.data);
  useEffect(()=>{
    setMylist(list.data)
  })
  return (
    <div>
      <Head>
        <title>Create Next App</title>
      </Head>
      <Header />
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
          <div className="bread-div">
            <Breadcrumb>
              <Breadcrumb.Item>
                <a href="/">首页</a>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <a href="/">视频教程</a>
              </Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <List
            header={<div>最新日志</div>}
            itemLayout="vertical"
            dataSource={mylist}
            renderItem={item => (
              <List.Item>
                <div className="list-title">
                  <Link
                    href={{ pathname: "/detailed", query: { id: item.id } }}
                  >
                    <a>{item.title}</a>
                  </Link>
                </div>
                <div className="list-icon">
                  <span>
                    <CalendarOutlined /> {item.addTime}
                  </span>
                  <span>
                    <YoutubeOutlined /> {item.typeName}
                  </span>
                  <span>
                  <FireOutlined /> {item.view_count}人
                  </span>
                </div>
                <div className="list-context">{item.introduce}</div>
              </List.Item>
            )}
          />
        </Col>
        <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author />
          <Advert />
        </Col>
      </Row>

      <Footer />
    </div>
  );
};

Mylist.getInitialProps = async context => {
  let id = context.query.id;
  const promise = new Promise(reslove => {
    axios(servicePath.getListById + id).then(res => reslove(res.data));
  });
  return promise;
};

export default Mylist;
