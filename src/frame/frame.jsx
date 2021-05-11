import React, {useEffect} from 'react'
import {observer, inject} from 'mobx-react'
import {Layout, Spin} from 'antd'

import SiderMenu from './sider-menu'
import MyHeader from './my-header'

const {Sider, Content} = Layout

const Frame = ({globalStore, children}) => {
  const {userInfo, collapsed} = globalStore
  useEffect(() => {
    globalStore.loginInfo()
  }, [])

  if (userInfo) {
    return (
      <Layout className="frame">
        <MyHeader globalStore={globalStore} />
        <Layout>
          <Sider collapsed={collapsed}>
            <SiderMenu globalStore={globalStore} />
          </Sider>
          <Content>{children}</Content>
        </Layout>
      </Layout>
    )
  }

  return (
    <div style={{textAlign: 'center'}}>
      <Spin />
    </div>
  )
}

export default inject('globalStore')(observer(Frame))
