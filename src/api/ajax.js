/*
用来发ajax请求的函数模块
包装的就是axios ==>向外暴露本质就是axios   
1.将post请求的data随想数据传换成urlencode格式的字符串数据   //请求拦截器（后台接口不能处理JSON格式请求参数）
2.请求成功请求得到的不是response，而是response.data       //响应拦截器（使用成功回调）
3.统一处理请求异常。外部调用者不用子啊处理请求异常          //响应拦截器使用失败回调）
*/

import axios from 'axios'
import qs from 'qs'
import { message } from 'antd'



/*使用请求拦截器*/
axios.interceptors.request.use(config =>{
  // 1. 将post请求的data随想数据传换成urlencode格式的字符串数据
  if (config.method.toUpperCase()==='POST'&& config.data instanceof Object) {
      //  config.data
     config.data =  qs.stringify(config.data)
  }

  return config
})
/*使用响应拦截器*/
axios.interceptors.response.use(
  response => {
    // 2. 请求成功请求得到的不是response， 而是response.data
    return response.data
  },
  error =>{
     message.error('请求失败: ' + error.message)
    //返回一个pending状态Promise ==>  中断promise链
    return new Promise(()=>{})
    // 3. 统一处理请求异常。 外部调用者不用子啊处理请求异常
  }
  
)

axios.post ('/login',{uesrname:'admin',password:'admin'})



export default axios