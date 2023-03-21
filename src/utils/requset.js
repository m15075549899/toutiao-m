//请求模块
import axios from 'axios'

const requset = axios.create({
    // baseURL: 'http://ttapi.research.itcast.cn/' //接口的基准路径
     baseURL:'api',//把原来的项目地址，改成api，解决跨域问题
     timeout:3000
})
export default requset