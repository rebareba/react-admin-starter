import React, {useEffect} from 'react'
import {inject, observer} from 'mobx-react'

const UserList = ({globalStore}) => {
  useEffect(() => {
    globalStore.setBreadcrumb([{name: '主页', href: '/home'}, {name: '常用实现'}, {name: '用户管理'}])
  }, [])
  return <div>用户列表页面</div>
}

export default inject('globalStore')(observer(UserList))
