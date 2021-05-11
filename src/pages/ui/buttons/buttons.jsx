import React, {useEffect} from 'react'

import {inject, observer} from 'mobx-react'
import {Button} from 'antd'

const Buttons = ({globalStore}) => {
  useEffect(() => {
    globalStore.setBreadcrumb([{name: '主页', href: '/home'}, {name: 'UI'}, {name: '按钮'}])
  }, [])
  return <Button>{globalStore.userInfo.nickname}</Button>
}

export default inject('globalStore')(observer(Buttons))
