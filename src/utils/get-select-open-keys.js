/*
 * @Author: changfeng
 * @LastEditors: changfeng
 * @LastEditTime: 2021-05-11 17:07:10
 * @Description: 获取默认的展开和选中的菜单
 */
const getSelectOpenKeys = (userMenu = [], path = '') => {
  let selectkeys = []
  let openKeys = []

  userMenu.forEach((item) => {
    if (item.children) {
      const temp = getSelectOpenKeys(item.children, path)
      selectkeys = selectkeys.concat(temp.selectkeys)
      openKeys = openKeys.concat(temp.openKeys)
      if (temp.selectkeys.length > 0 || temp.openKeys.length > 0) {
        openKeys.push(item.url)
      }
    } else if (path.indexOf(item.url) === 0) {
      selectkeys.push(item.url)
    }
  })
  return {selectkeys, openKeys}
}

export default getSelectOpenKeys
