/**
 * @method 判断是否是移动端
 * @returns {boolean} boolean
 */
export const isMobile = (): boolean => {
  if((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
    return true
  }else {
    // 宽度小于1000px时也识为移动端
    if (document.body.clientWidth >= 1000) {
      return false
    } else {
      return true
    }
  }
}

/**
 * @method asyncAwait捕获错误
 * @param {promise} promise
 */
 export const awaitTo = (promise: any): any[] => {
  return promise.then((data: any) => {
    return [null, data];
  })
  .catch((err: any) => [err]);
};
