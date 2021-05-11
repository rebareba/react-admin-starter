/*
 * @Author: changfeng
 * @LastEditors: changfeng
 * @LastEditTime: 2021-05-11 11:41:43
 * @Description: 通过配置获取页面的路由
 */
const getPageRoutes = (menu = []) => {
  let arr = []
  menu.forEach((item) => {
    if (item.children) {
      const temp = getPageRoutes(item.children)
      arr = arr.concat(temp)
    } else if (item.component) {
      arr.push(item)
    }
  })
  return arr
}
export default getPageRoutes
