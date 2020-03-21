// let ipUrl = 'http://localhost:5000/api' 

let servicePath = {
    login: '/api/users/login',  //检查用户名和密码
    getTypeInfo: '/api/type',  //获得文章类别信息
    addArticle: '/api/profiles/add',  //添加文章
    updateArticle: '/api/profiles/edit/',  //修改文章
    getArticleList: '/api/profiles',  //获取文章列表
    delArticle: '/api/profiles/delete/',  //删除文章
    getArticleById: '/api/profiles/',  //根据ID获得文章详情
    updateType: '/api/type/edit/',  //修改文章分类
    delType: '/api/type/delete/',  //删除文章分类
    addType: '/api/type/add',  //添加文章类别

}

export default servicePath