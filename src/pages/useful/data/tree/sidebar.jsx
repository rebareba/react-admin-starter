import {observer} from 'mobx-react'
import {Spin} from 'antd'
import SidebarTree from './sidebar-tree'

const SiderBar = () => {
  return (
    <div className="collection-sidebar bgf">
      <Spin spinning={false}>
        <SidebarTree />
      </Spin>
    </div>
  )
}
export default observer(SiderBar)
