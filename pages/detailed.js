import React from 'react';
import Head from 'next/head'
import Header from '../components/Header'
import Author from "../components/Author";
import Advert from "../components/Advert";
import Footer from "../components/Footer";
import '../public/style/pages/detailed.css'
import {Row,Col,Breadcrumb} from 'antd'
import {CalendarOutlined,YoutubeOutlined,FireOutlined} from "@ant-design/icons";
const Detailed = () => (
  <div>
    <Head>
      <title>Detailed</title>
    </Head>
    <Header />
    <Row className="comm-main" type="flex" justify="center">
          <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
              <div>
                <div className="bread-div">
                  <Breadcrumb>
                    <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
                    <Breadcrumb.Item><a href="/list">视频教程</a></Breadcrumb.Item>
                    <Breadcrumb.Item><a href="/">xxxx</a></Breadcrumb.Item>
                  </Breadcrumb>
                </div>
                <div>
                  <div className="detailed-title">
                      react实战视频教程
                  </div>
                  <div className="list-icon center">
                    <span><CalendarOutlined /> 2020-03-15</span>
                    <span><YoutubeOutlined /> 视频教程</span>
                    <span><FireOutlined /> 9999人</span>
                  </div>
                  <div className="detailed-content">
                        markdown  内容
                  </div>
                </div>
              </div>
          </Col>
          <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
            <Author />
            <Advert />
          </Col>
    </Row>

    <Footer />
  </div>
)

export default Detailed