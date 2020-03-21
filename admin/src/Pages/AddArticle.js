import React, { useState, useEffect } from "react";
import marked from "marked";
import "../static/css/AddArticle.css";
import { Row, Col, Input, Select, Button, DatePicker, message } from "antd";
import axios from "../config/http";
import servicePath from "../config/apiUrl";
const { Option } = Select;
const { TextArea } = Input;

function AddArticle(props) {
  const renderer = new marked.Renderer();
  const [articleId, setArticleId] = useState(0); // 文章的ID，如果是0说明是新增加，如果不是0，说明是修改
  const [articleTitle, setArticleTitle] = useState(""); //文章标题
  const [articleContent, setArticleContent] = useState(""); //markdown的编辑内容
  const [markdownContent, setMarkdownContent] = useState("预览内容"); //html内容
  const [introducemd, setIntroducemd] = useState(); //简介的markdown内容
  const [introducehtml, setIntroducehtml] = useState("等待编辑"); //简介的html内容
  const [showDate, setShowDate] = useState(); //发布日期
  const [typeInfo, setTypeInfo] = useState([]); // 文章类别信息
  const [selectedType, setSelectType] = useState("文章类别"); //选择的文章类别

  useEffect(() => {
    getTypeInfo();

    // 获取文章id
    let tmpId = props.match.params.id;
    if (tmpId) {
      setArticleId(tmpId);
      getArticleById(tmpId);
    }
  }, []);
  marked.setOptions({
    renderer,
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false
  });
  const changeContent = e => {
    setArticleContent(e.target.value);
    let html = marked(e.target.value);
    setMarkdownContent(html);
  };

  const changeIntroduce = e => {
    setIntroducemd(e.target.value);
    let html = marked(e.target.value);
    setIntroducehtml(html);
  };

  const getTypeInfo = () => {
    axios.get(servicePath.getTypeInfo).then(res => {
      setTypeInfo(res.data);
    });
  };

  //设置分类
  const selectTypeHandler = value => {
    setSelectType(value);
  };

  const getArticleById = id => {
    axios(servicePath.getArticleById + id, { withCredentials: true }).then(
      res => {
        let articleInfo = res.data.data;
        console.log(res);
        setArticleTitle(articleInfo.title);
        setArticleContent(articleInfo.article_content);
        let html = marked(articleInfo.article_content);
        setMarkdownContent(html);
        setIntroducemd(articleInfo.introduce);
        let tmpInt = marked(articleInfo.introduce);
        setIntroducehtml(tmpInt);
        setShowDate(articleInfo.addTime);
        setSelectType(articleInfo.typeName);
      }
    );
  };

  const saveArticle = () => {
    if (!selectedType) {
      message.error("必须选择文章类型");
      return false;
    } else if (!articleTitle) {
      message.error("文章名称不能为空");
      return false;
    } else if (!articleContent) {
      message.error("文章内容不能为空");
      return false;
    } else if (!introducemd) {
      message.error("文章简介不能为空");
      return false;
    } else if (!showDate) {
      message.error("发布日期不能为空");
      return false;
    } else if (selectedType == "文章类别") {
      message.error("请选择文章类别");
      return false;
    }
    let dataProps = {};
    dataProps.typeName = selectedType;
    dataProps.title = articleTitle;
    dataProps.article_content = articleContent;
    dataProps.introduce = introducemd;
    let dataText = showDate.replace("-", "/");
    dataProps.addTime = new Date(dataText).getTime() / 1000;

    if (articleId == 0) {
      dataProps.view_count = 999;
      axios.post(servicePath.addArticle, dataProps).then(res => {
        setArticleId(res.data.insertId);
        if (res.data.isSuccess) {
          message.success("文章添加成功");
        } else {
          message.error("文章添加失败");
        }
      });
    } else {
      axios
        .post(servicePath.updateArticle + articleId,dataProps)
        .then(res =>
          res.data.isSuccess
            ? message.success("文章保存成功")
            : message.error("文章保存失败")
        );
    }
  };
  return (
    <Row gutter={5}>
      <Col span={18}>
        <Row gutter={10}>
          <Col span={20}>
            <Input
              value={articleTitle}
              placeholder="博客标题"
              size="large"
              onChange={e => setArticleTitle(e.target.value)}
            />
          </Col>
          <Col span={4}>
            &nbsp;
            <Select
              defaultValue={selectedType.data}
              size="large"
              onChange={selectTypeHandler}
              placeholder="文章类型"
            >
              {typeInfo.map((item, index) => {
                return (
                  <Option key={index} value={item.typeName} >
                    {item.typeName}
                  </Option>
                );
              })}
            </Select>
          </Col>
        </Row>
        <br />
        <Row gutter={10}>
          <Col span={12}>
            <TextArea
              className="markdown-content"
              rows={35}
              value={articleContent}
              placeholder="文章内容"
              onChange={changeContent}
            />
          </Col>
          <Col span={12}>
            <div
              className="show-html"
              dangerouslySetInnerHTML={{ __html: markdownContent }}
            ></div>
          </Col>
        </Row>
      </Col>
      <Col span={6}>
        <Row>
          <Col span="24">
            <Button size="large"> 暂存文章</Button>&nbsp;
            <Button size="large" type="primary" onClick={saveArticle}>
              发布文章
            </Button>
            <br />
          </Col>
          <Col span="24">
            <br />
            <TextArea
              rows={4}
              placeholder="文章简介"
              value={introducemd}
              onChange={changeIntroduce}
            ></TextArea>
            <br />
            <br />
            <div
              className="introduce-html"
              dangerouslySetInnerHTML={{ __html: introducehtml }}
            ></div>
          </Col>
          <Col span={12}>
            <div className="date-select">
              <DatePicker
                onChange={(date, dateString) => setShowDate(dateString)}
                placeholder="发布日期"
                size="large"
              />
            </div>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

export default AddArticle;
