import React, {useEffect} from 'react'
import {observer} from 'mobx-react'
import logo from '@assets/svg/logo.svg'
import {useLocation, Link} from 'react-router-dom'
import {Menu, Dropdown, Breadcrumb, Layout} from 'antd'
import {config} from '@utils'
import {DownOutlined, MenuUnfoldOutlined, MenuFoldOutlined} from '@ant-design/icons'

const {Header} = Layout
const MyHeader = ({globalStore}) => {
  const {userInfo, collapsed, breadcrumb, logout, toggleCollapsed} = globalStore
  // 徽标的渲染处理
  const renderBreadcrumb = (breadcrumbData) => {
    if (breadcrumbData && breadcrumbData.length > 0) {
      return (
        <Breadcrumb className="FB1 ml10">
          <Breadcrumb.Item> </Breadcrumb.Item>
          {breadcrumbData.map((item) => {
            return (
              <Breadcrumb.Item key={item.name}>
                {item.href ? <Link to={`${config.pathPrefix}${item.href}`}>{item.name}</Link> : item.name}
              </Breadcrumb.Item>
            )
          })}
        </Breadcrumb>
      )
    }
    return null
  }

  return (
    <Header className="fbh fbac" style={{background: '#fff', padding: 0}}>
      <div className="frame-logo p10">
        <img src={logo} className="w100 h100" />
      </div>
      <div className="fb1 fbh fbac fbjb">
        <div className="fs26 fw500" style={{minWidth: 120}}>
          {config.name}
        </div>
        <div onClick={toggleCollapsed} className="fbh fbac">
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {className: 'fs20'})}
        </div>
        {renderBreadcrumb(breadcrumb)}
      </div>
      {/* <Menu mode="horizontal" defaultSelectedKeys={['2']}>
        <Menu.Item key="1">nav 1</Menu.Item>
        <Menu.Item key="2">nav 2</Menu.Item>
        <Menu.Item key="3">nav 3</Menu.Item>
      </Menu> */}
      <div className="ml20">
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key="0" className="mt0 mb0 pt4 pb4">
                <Link to={`${config.pathPrefix}/user-center`}>个人中心</Link>
              </Menu.Item>
              <Menu.Divider />
              <Menu.Item className="mt0 mb0 pt4 pb4" onClick={logout}>
                退出登录
              </Menu.Item>
            </Menu>
          }
          trigger={['click']}
        >
          <div className="fbh fbac fbje pr20 hand">
            <div className="ml8">
              {userInfo.nickname} <DownOutlined />
            </div>
          </div>
        </Dropdown>
      </div>
    </Header>
  )
}
export default observer(MyHeader)
