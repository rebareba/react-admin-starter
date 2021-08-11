import React, {useEffect, useMemo, useState} from 'react'

import {inject, observer} from 'mobx-react'
import {Button, Spin} from 'antd'
import SearchCondition from './components/search-condition'
import TableList from './table-list'
import ProjectManageStore from './store-project-manage'
import AddMemberModal from './add-member-modal'
import ProjectDetailModal from './project-detail-modal'
import AddProjectModal from './add-project-modal'
import './project-manage.styl'

const ProjectManage = ({globalStore}) => {
  const store = useMemo(() => {
    return new ProjectManageStore()
  }, [])

  useEffect(() => {
    if (store) {
      // 初始化数据
      store.getFilterList()
      store.getProjectList()
    }
  }, [store])
  useEffect(() => {
    globalStore.setBreadcrumb([{name: '主页', href: '/home'}, {name: '项目管理'}])
  }, [])
  return (
    <Spin spinning={store.loadingConfig}>
      <div className="page-project-manage p24">
        <div className="fc8 fs16 mb16">项目管理</div>
        <div className="fbh mb16">
          <div className="fb1">
            {'有权限' && (
              <Button type="primary" onClick={() => store.setValue('visibleModal', 'addProjectModal')}>
                新建项目
              </Button>
            )}
          </div>
          <SearchCondition store={store} />
        </div>
        <TableList store={store} />
      </div>
      <AddMemberModal store={store} />
      <ProjectDetailModal store={store} />
      <AddProjectModal store={store} />
    </Spin>
  )
}

export default inject('globalStore')(observer(ProjectManage))
