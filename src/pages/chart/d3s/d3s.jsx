import {inject, observer} from 'mobx-react'
import React, {useEffect} from 'react'

const D3s = ({globalStore}) => {
  useEffect(() => {
    globalStore.setBreadcrumb([{name: '主页', href: '/home'}, {name: ' D3'}])
  }, [])
  return <div>用户列表页面</div>
}

export default inject('globalStore')(observer(D3s))
