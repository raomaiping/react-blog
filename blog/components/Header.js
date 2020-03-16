import React, { useState, useLayoutEffect, useEffect } from "react";
import "../public/style/components/header.css";
import { Row, Col, Menu } from "antd";
import { createFromIconfontCN } from "@ant-design/icons";
import Router from "next/router";
import Link from "next/link";
import axios from "axios";
import servicePath from "../config/apiUrl";
const MyIcon = createFromIconfontCN({
    scriptUrl: "//at.alicdn.com/t/font_1694685_r2yawq3keo.js" // 在 iconfont.cn 上生成
    });
const Header = () => {

    const [navArry,setNavArray] = useState([])
    useEffect(()=>{
        const fetchData = async ()=>{
            const result = await axios(servicePath.getTypeInfo).then(res=>res.data.data)
            setNavArray(result)
        }
        fetchData()
    },[])
    const hanldeClick = (e)=>{
        if(e.key == 0){
            Router.push('/index')
        }else{
            Router.push('/list?id='+e.key)
        }
    }
  return (
    <div className="header">
      <Row type="flex" justify="center">
        <Col xs={24} sm={24} md={10} lg={15} xl={12}>
          <span className="header-logo">前端小菜鸟吖</span>
          <span className="header-text">一个菜鸟级别的前端工程师</span>
        </Col>
        <Col xs={0} sm={0} md={14} lg={8} xl={6}>
          <Menu mode="horizontal"  onClick={hanldeClick}>
            <Menu.Item key="0" >
              <MyIcon type="icon-shouyedianpujishishangcheng" />
              首页
            </Menu.Item>
            {
                navArry.map(item=>{
                    return (
                        <Menu.Item key={item.Id}>
                        <MyIcon type={item.icon} />
                        {item.typeName}
                      </Menu.Item>
                    )
                })
            }
          </Menu>
        </Col>
      </Row>
    </div>
  );
};

export default Header;
