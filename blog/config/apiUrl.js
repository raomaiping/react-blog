let ipUrl = 'http://localhost:5000/api'
let servicePath = {
    getArticleList:ipUrl + '/profiles' ,  //  首页文章列表接口
    getArticleById:ipUrl + '/profiles/',  // 文章详细页内容接口 ,需要接收参数
    getTypeInfo:ipUrl + '/type',         // 文章分类信息
    getListById:ipUrl + '/profiles/type/',         // 根据类别ID获得文章列表  
}

export default servicePath