import React, { useState, useEffect } from "react";
import "../static/css/AddType.css";
import axios from "../config/http";
import servicePath from "../config/apiUrl";
import { createFromIconfontCN } from "@ant-design/icons";
import { List, Row, Col, Modal, message, Button, Input } from "antd";
import keys from '../config/keys'
function AddType() {
  const { confirm } = Modal;
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [typeInfo, setTypeInfo] = useState({});
  const [typeName, setTypeName] = useState("");
  const [icon, setIcon] = useState("");
  const MyIcon = createFromIconfontCN({
    scriptUrl: keys.iconUrl // 在 iconfont.cn 上生成
  });

  //删除类别的方法
  const delType = id => {
    confirm({
      title: "确定要删除这篇博客文章吗？",
      content: "如果你点击ok按钮,文章将永远被删除，无法恢复",
      onOk() {
        axios.delete(servicePath.delType + id).then(res => {
          message.success("文章删除成功");
          getTypeList();
        });
        getTypeList();
      },
      onCancel() {
        message.success("没有任何变化");
      }
    });
  };
  //得到文章类别列表
  const getTypeList = () => {
    axios.get(servicePath.getTypeInfo).then(res => {
      setList(res.data);
    });
  };

  const showModal = item => {
    setVisible(true);
    setTypeInfo(item);
  };

  //添加文章类别列表
  const AddTypeInfo = () => {
    setVisible(true);
    setTypeInfo('');
  };

  //修改文章类别列表
  const handleOk = () => {
    setLoading(true);
    if (!typeName) {
      message.error("文章类别不能为空");
      setTimeout(() => {
        setLoading(false);
      }, 500);
      return false;
    } else if (!icon) {
      message.error("Icon图标不能为空");
      setTimeout(() => {
        setLoading(false);
      }, 500);
      return false;
    }
    let type = {};
    type.typeName = typeName;
    type.icon = icon;
    if (typeInfo._id) {
      axios.post(servicePath.updateType + typeInfo._id, type).then(res => {
        if (res.data.isSuccess) {
          message.success("修改成功");
          getTypeList();
        } else {
          message.error("修改失败");
        }  
      });

    }else{
      axios.post(servicePath.addType, type).then(res=>{
        if (res.data.isSuccess) {
          message.success("添加成功");
          getTypeList();
        } else {
          message.error("添加失败");
        }
      })

    }
    setTypeName('')
    setIcon('')
    setVisible(false);
    setLoading(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  useEffect(() => {
    getTypeList();
  }, []);
  return (
    <>
      <List
        header={
          <Row className="list-div">
            <Col span={8}>
              <b>类别</b>
            </Col>
            <Col span={8}>
              <b>ICON</b>
            </Col>
            <Col span={4}>
              <b>操作</b>
            </Col>
            <Col span={4}>
              <b>
                {" "}
                <Button type="primary" onClick={AddTypeInfo}>
                  添加分类
                </Button>
              </b>
            </Col>
          </Row>
        }
        bordered
        pagination={{
          pageSize: 8,
          showQuickJumper: true,
          hideOnSinglePage: true
        }}
        dataSource={list}
        renderItem={item => (
          <List.Item>
            <Row className="list-div">
              <Col span={8}>{item.typeName}</Col>
              <Col span={8}>
                <MyIcon type={item.icon} />
              </Col>
              <Col span={4}>
                <Button type="primary" onClick={() => showModal(item)}>
                  修改
                </Button>
                &nbsp;
                <Button
                  onClick={() => {
                    delType(item._id);
                  }}
                >
                  删除
                </Button>
              </Col>
            </Row>
          </List.Item>
        )}
      />
      <Modal
        visible={visible}
        title="修改文章类别"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            取消
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={handleOk}
          >
            确定
          </Button>
        ]}
      >
        <Input
          placeholder={typeInfo.typeName}
          onChange={e => {
            setTypeName(e.target.value);
          }}
          value={typeName}
        />
        <br />
        <br />
        <Input
          placeholder={typeInfo.icon}
          onChange={e => {
            setIcon(e.target.value);
          }}
          value={icon}
        />
      </Modal>
    </>
  );
}

export default AddType;
