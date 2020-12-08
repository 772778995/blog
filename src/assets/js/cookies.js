// 设置cookie过期时间
function afterDay (day) {
  var time = new Date()
  time.setDate(time.getDate() + day)
  return time
}
// 设置cookie
function setCookies (key, value, expires) {
  expires = afterDay(expires)
  document.cookie = `${key}=${value};expires=${expires}`
}
// 获取cookies的对象
function getCookies () {
  var cookies = document.cookie.split('; ')
  var cookiesArr = []
  var cookiesObj = {}
  for (var i = 0; i < cookies.length; i++) {
    cookiesArr[i] = cookies[i].split('=')
    cookiesObj[cookiesArr[i][0]] = cookiesArr[i][1]
  }
  return cookiesObj
}

export { setCookies }
export { getCookies }
