import React, {useEffect} from 'react'
import {inject, observer} from 'mobx-react'
import {Button} from 'antd'

const Icons = ({globalStore}) => {
  useEffect(() => {
    globalStore.setBreadcrumb([{name: '主页', href: '/home'}, {name: 'UI'}, {name: '图标'}])
  }, [])
  return <Button>{globalStore.userInfo.nickname} Icons</Button>
}

export default inject('globalStore')(observer(Icons))
