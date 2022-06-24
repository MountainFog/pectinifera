/**
 *Created by zhangbin on 2019/1/2
 */
const isEmpty = (value) => {
  if (value === undefined || value === null || value === 'null' || value === '' || value.length <= 0) {
    return true
  } else {
    return false
  }
}
/**
 * 获取 url 中的参数
 */
const getQueryString = (name) => {
  let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
  let r = window.location.search.substr(1).match(reg)
  if (!isEmpty(r)) return encodeURI(r[2])
  return null
}

const getParams = (url, name) => {
  let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
  if (typeof url === 'string') {
    let r = url.split('?')[1].match(reg)
    if (!isEmpty(r)) return r[2]
    return null
  }
  return null
}
/**
 * 登录成功跳转处理
 * demo：loginSuccess(this.$router)
 */
const loginSuccess = (router) => {
  let returnPage = window.localStorage.returnPage
  let loginArr = ['/login', '/auth']
  if (returnPage && !loginArr.includes(returnPage)) {
    return router.replace({
      path: returnPage
    })
  } else {
    return router.replace({
      path: '/'
    })
  }
}

/**
 * 判断图片是否存在
 * @param imgSrc
 * @returns {boolean}
 */
const checkImg = (imgSrc) => {
  let ImgObj = new Image() // 判断图片是否存在
  ImgObj.src = imgSrc
  // console.log('----------imgSrc');
  // 没有图片，则返回-1
  return ImgObj.fileSize > 0 || (ImgObj.width > 0 && ImgObj.height > 0)
}

export {
  isEmpty,
  getQueryString,
  getParams,
  loginSuccess,
  checkImg
}
