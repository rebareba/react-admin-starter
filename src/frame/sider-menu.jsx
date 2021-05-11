import {observer} from 'mobx-react'
import {history, getSelectOpenKeys} from '@utils'
import {Menu} from 'antd'
import {useLocation} from 'react-router-dom'

const {SubMenu} = Menu
const SiderMenu = ({globalStore}) => {
  const {userMenu, collapsed} = globalStore
  // 渲染菜单
  const renderMenu = (menuData) => {
    const arr = []
    menuData.forEach((item) => {
      if (item.children) {
        arr.push(
          <SubMenu
            title={
              <span>
                {item.icon ? item.icon : null}
                <span>{item.name}</span>
              </span>
            }
            key={item.url}
          >
            {renderMenu(item.children)}
          </SubMenu>,
        )
      } else {
        arr.push(
          <Menu.Item key={item.url}>
            {item.icon ? item.icon : null}
            <span>{item.name}</span>
          </Menu.Item>,
        )
      }
    })
    return arr
  }
  // 菜单栏的触发设置
  const onMenuSelect = (value) => {
    history.push(value.key)
  }
  const location = useLocation()
  const {selectkeys, openKeys} = getSelectOpenKeys(userMenu, location.pathname)
  console.log('selectkeys, openKeys', selectkeys, openKeys)
  return (
    <Menu
      theme="dark"
      mode="inline"
      inlineIndent={10}
      inlineCollapsed={collapsed}
      onSelect={onMenuSelect}
      onClick={onMenuSelect}
      defaultOpenKeys={openKeys}
      defaultSelectedKeys={selectkeys}
    >
      {renderMenu(userMenu)}
    </Menu>
  )
}

export default observer(SiderMenu)
