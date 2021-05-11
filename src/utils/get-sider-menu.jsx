/**
 * 获取侧边栏的用户菜单
 * @param {*} permissions {user: 15}
 * @param {*} menu []
 * @returns
 */
const getSiderMenu = (menu = [], permissions = {}) => {
  const arr = []
  menu.forEach((item) => {
    if (item.children) {
      const temp = getSiderMenu(item.children, permissions)
      if (temp.length > 0) {
        item.children = temp
        arr.push(item)
      }
    } else if (
      item.isMenu &&
      (!item.key || !item.permission || (permissions[item.key] && permissions[item.key] & item.permission))
    ) {
      arr.push(item)
    }
  })
  return arr
}

export default getSiderMenu
