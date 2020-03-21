import React, { useState } from "react";
import Head from "next/head";
import axios from "axios";
import Link from "next/link";
import Header from "../components/Header";
import Author from "../components/Author";
import Footer from "../components/Footer";
import { Row, Col, List ,BackTop} from "antd";
import {
  CalendarOutlined,
  YoutubeOutlined,
  FireOutlined
} from "@ant-design/icons";
import "../public/style/pages/index.css";
import servicePath from "../config/apiUrl";
import marked from "marked";
import hljs from "highlight.js";
import "highlight.js/styles/monokai-sublime.css";
const Home = list => {
  const [mylist, setMylist] = useState(list.data);
  const renderer = new marked.Renderer();
  const getLocalTime =(nS)=> {     
    return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');     
  }
  marked.setOptions({
    renderer: renderer,
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false,
    sanitize: false,
    xhtml: false,
    highlight: function(code) {
      return hljs.highlightAuto(code).value;
    }
  });
  return (
    <div>
      <Head>
        <title>前端小菜鸟吖的技术博客</title>
      </Head>
      <Header />
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
          <List
            header={<div>最新日志</div>}
            itemLayout="vertical"
            dataSource={mylist}
            renderItem={item => (
              <List.Item>
                <div className="list-title">
                  <Link
                    href={{ pathname: "/detailed", query: { id: item._id } }}
                  >
                    <a>{item.title}</a>
                  </Link>
                </div>
                <div className="list-icon">
                  <span>
                    <CalendarOutlined />
                    {getLocalTime(item.addTime)}
                  </span>
                  <span>
                    <YoutubeOutlined /> {item.typeName}
                  </span>
                  <span>
                    <FireOutlined /> {item.view_count}人
                  </span>
                </div>
                <div
                  className="list-context"
                  dangerouslySetInnerHTML={{ __html: marked(item.introduce) }}
                ></div>
              </List.Item>
            )}
          />
        </Col>
        <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author />
        </Col>
      </Row>

      <Footer />
      <BackTop />
    </div>
  );
};

Home.getInitialProps = async () => {
  const promise = new Promise(reslove => {
    axios(servicePath.getArticleList).then(res => {
      reslove(res.data);
    });
  });
  return promise;
};
export default Home;
