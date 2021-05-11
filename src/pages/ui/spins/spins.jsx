import React, {useEffect} from 'react'

import {inject, observer} from 'mobx-react'
import {Button} from 'antd'

const Spins = ({globalStore}) => {
  useEffect(() => {
    globalStore.setBreadcrumb([{name: '主页', href: '/home'}, {name: 'UI'}, {name: '加载'}])
  }, [])
  return <Button>{globalStore.userInfo.nickname} Spins</Button>
}

export default inject('globalStore')(observer(Spins))
