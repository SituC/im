import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios' //导入axios 和钩子
import { ApiErrorCode } from './errorCode'
import globalConfig from '../config/index'
// import { ElLoading } from 'element-plus' //导入ElLoading
// import { ILoadingInstance } from 'element-plus/lib/components/loading/src/loading.type' //导入ElLoading钩子
 
// 初始化loading
const successCode = [200, 201]
export class Request {
  public static axiosInstance: AxiosInstance
  // public static loading?: ILoadingInstance //loading实例 挂载到公共的静态属性上 方便获取
 
  public static init() {
    // 创建axios实例
    this.axiosInstance = axios.create({
      baseURL: '/api', // 代理转发
      timeout: 6000
    })
    // 初始化拦截器
    this.initInterceptors()
    return axios
  }
 
  // 初始化拦截器
  public static initInterceptors() {
    // 设置post请求头
    this.axiosInstance.defaults.headers.post['Content-Type'] =
      'application/x-www-form-urlencoded'
    /**
     * 请求拦截器
     * 每次请求前，如果存在token则在请求头中携带token
     */
 
    this.axiosInstance.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        const token = localStorage.getItem(globalConfig.tokenName) //保存token到localStorage中
        if (token) {
          ;(config as any).headers.Authorization = 'Bearer ' + token //携带请求头
        }
        return config
      },
      (error: any) => {
        console.log(error)
      }
    )
 
    // 响应拦截器
    this.axiosInstance.interceptors.response.use(
      // 请求成功
      (response: AxiosResponse) => {
        // this.loading?.close() //将loading移除
 
        if (successCode.includes(response.status)) {
          // 拦截服务端返回错误
          if (response.data.code === 0) {
            return response.data
          } else {
            Request.serverErrorHandle(response)
            Promise.reject(response.data)
          }
        } else {
          Request.errorHandle(response)
          return response
        }
      },
      // 请求失败
      (error: any) => {
        const { response } = error
        if (response) {
          // 请求已发出，但是不在2xx的范围
          Request.errorHandle(response)
          return Promise.reject(response.data)
        } else {
          // 处理断网的情况
          alert('网络连接异常,请稍后再试!')
        }
      }
    )
  }
 
  /**
   * 后端自定义错误
   * @param res 响应回调,根据不同响应进行不同操作
   */
  private static serverErrorHandle(res: any) {
    switch (res?.data?.code) {
      case ApiErrorCode.ERROR_TOAST:
        alert(res.data.message)
        break
    }
  }
  /**
   * http握手错误
   * @param res 响应回调,根据不同响应进行不同操作
   */
  private static errorHandle(res: any) {
    // 状态码判断
    switch (res.status) {
      case 401:
        break
      case 403:
        break
      case 404:
        alert('请求的资源不存在')
        break
      case 500:
        alert('服务器异常')
        break
      default:
        alert('连接错误')
    }
  }
}

export default Request.init()