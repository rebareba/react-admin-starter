import React, {useEffect} from 'react'
import {inject, observer} from 'mobx-react'

const Echarts = ({globalStore}) => {
  useEffect(() => {
    globalStore.setBreadcrumb([{name: '主页', href: '/home'}, {name: ' Echarts'}])
  }, [])
  return <div>Echarts</div>
}

export default inject('globalStore')(observer(Echarts))
