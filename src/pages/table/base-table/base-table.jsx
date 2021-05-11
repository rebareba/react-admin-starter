import React, {useEffect} from 'react'

import {inject, observer} from 'mobx-react'
import {Button} from 'antd'

const BaseTable = ({globalStore}) => {
  useEffect(() => {
    globalStore.setBreadcrumb([{name: '主页', href: '/home'}, {name: '表格'}, {name: '基本表格'}])
  }, [])
  return <Button>{globalStore.userInfo.nickname}BaseTable</Button>
}

export default inject('globalStore')(observer(BaseTable))
