import { Request } from '../utils/request'//导入请求拦截器request
import { ReigsterParams, CreateGroupParams } from './type'

/**
 * @method 登录接口
 * @param {ReigsterParams} params 
 * @returns {Promise}
 */
export function loginApi(params: ReigsterParams) {
  return Request.axiosInstance({
    url: '/user/login',
    method: 'post',
    data: params
  })
}

/**
 * @method 退出登录接口
 * @returns {Promise}
 */
 export function loginoutApi() {
  return Request.axiosInstance({
    url: '/user/loginout',
    method: 'post',
  })
}


/**
 * @method 获取用户信息
 * @returns {Promise}
 */
 export function userinfoApi() {
  return Request.axiosInstance({
    url: '/user/getUser',
    method: 'post',
  })
}

/**
 * @method 创建群聊
 * @param {ReigsterParams} params 
 * @returns {Promise}
 */
 export function createGroupApi(params: CreateGroupParams) {
  return Request.axiosInstance({
    url: '/group/create',
    method: 'post',
    data: params
  })
}

/**
 * @method 我的群聊列表
 * @returns {Promise}
 */
 export function groupListApi() {
  return Request.axiosInstance({
    url: '/group/list',
    method: 'post',
  })
}