// 发送请求
import axios from "axios";


const Http = {}
// 文档规定必须有install
Http.install = function (Vue) {
    axios.defaults.baseURL = "http://localhost:8888/api/private/v1/"

    // 4. 添加实例方法
    Vue.prototype.$http = axios;
}
// 把结果对象给导出去
export default Http