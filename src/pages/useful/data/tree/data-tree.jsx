/*
 * @Author: changfeng
 * @LastEditors: changfeng
 * @LastEditTime: 2021-05-17 21:14:17
 * @Description: 侧边是可以拖拽的树的复杂数据列表
 */
import React, {useEffect} from 'react'
import {observer, inject} from 'mobx-react'
import {Card, Table, Button, Tooltip, Popconfirm, Modal, Layout} from 'antd'
import ContentLayout from '@components/content-layout'
import SearchConfig from '@components/search-config'
import moment from 'moment'
import Sidebar from './sidebar'

import dataTreeStore from './data-tree-store'

const DataTree = ({globalStore}) => {
  useEffect(() => {
    globalStore.setBreadcrumb([
      {name: '主页', href: '/home'},
      {name: '常用实现'},
      {name: '查询列表'},
      {name: '侧边拖拽树'},
    ])
  }, [])
  const columns = [
    {
      title: '报告名称',
      dataIndex: 'name',
      render: (text, record) => (
        <a
          target="_blank"
          className="omit"
          href={`#/data-quality/assess/report/${record.id}/${record.recentEvaluateTime}`}
          style={{minWidth: '200px', maxWidth: '300px', display: 'block'}}
          rel="noreferrer"
        >
          {text}
        </a>
      ),
    },
    {
      title: '质量模型',
      dataIndex: 'relModelName',
    },
    {
      title: '统计周期',
      dataIndex: 'statisticalPeriod',
      render: (text) => text === '1' && <span>昨日</span>,
    },
    {
      title: '调度类型',
      dataIndex: 'schedulingType',
      render: (text) => text === 2 && <span>自动调度</span>,
    },
    {
      title: '调度周期',
      dataIndex: 'schedulingCycle',
      render: (text) => text === 1 && <span>每天</span>,
    },
    {
      title: '有效日期',
      render: (text, record) => {
        if (record.effectiveDateStart && record.effectiveDateEnd) {
          return (
            <>
              {`${moment(record.effectiveDateStart).format('YYYY-MM-DD')} ~ ${moment(record.effectiveDateEnd).format(
                'YYYY-MM-DD',
              )}`}
            </>
          )
        }
        return null
      },
    },
    {
      title: '创建时间',
      dataIndex: 'ctime',
      key: 'ctime',
      sorter: true,
      render: (ctime) => {
        moment(ctime).format('YYYY-MM-DD HH:mm:ss')
      },
    },
    {
      title: '创建人',
      dataIndex: 'cNickName',
    },
    {
      title: '操作',
      fixed: 'right',
      render: (record) => {
        return (
          <>
            <a className="mr8" onClick={() => this.editItem(record)}>
              编辑
            </a>

            <Popconfirm
              title={
                <div>
                  <span className="fs14">你确定删除吗？</span>
                  <br />
                  <span className="fc45">会删除质量模型所有历史质量报告的数据</span>
                </div>
              }
              onConfirm={() => dataTreeStore.delQltyReport(record.id)}
            >
              <span className="c-link">删除</span>
            </Popconfirm>
          </>
        )
      },
    },
  ]

  const editItem = (o) => {}
  const search = (values) => {
    console.log('search', values)
  }
  const searchParams = [
    {
      component: 'input',
      label: '名称',
      name: 'name',
      // rules: [{required: true, message: '必须填写'}],
      componentProps: {
        placeholder: '请输入搜索的名称',
      },
    },
    {
      component: 'select',
      label: '创建人',
      name: 'createUserId',
      // initialValue: '',
      componentProps: {
        options: [
          {name: '用户A', value: 1},
          {name: '用户B', value: 2},
        ],
      },
    },
    {
      component: 'rangeDatePicker',
      label: '创建时间',
      name: 'timeRange',
      placeholder: '请输入质量模型名称',
    },
    {
      component: 'input',
      label: '模型',
      name: 'modelName',
      componentProps: {
        placeholder: '请输入模型名称',
      },
    },
  ]
  return (
    <ContentLayout>
      <ContentLayout.Header>
        <div className="content-header">数据列表</div>
      </ContentLayout.Header>
      <div className="page-data-element fbh">
        <Sidebar />
        <div className="fb1 p8" style={{overflowX: 'auto', width: '100%', height: 'calc(100vh - 134px)'}}>
          <Card bordered={false}>
            <SearchConfig search={search} searchParams={searchParams} />
            <Button type="primary" onClick={() => dataTreeStore.editItem()}>
              新建质量报告
            </Button>
            <div className="mt16">
              <Table
                rowClassName={(rowData, index) => `ant-table-row-${index % 2}`}
                tableLayout="auto"
                scroll={{x: 1000}}
                onChange={dataTreeStore.handleChange}
                columns={columns}
                loading={dataTreeStore.tableLoading}
                dataSource={dataTreeStore.list.slice()}
                pagination={{
                  current: dataTreeStore.pagination.currentPage,
                  total: dataTreeStore.pagination.count,
                  pageSize: dataTreeStore.pagination.pageSize,
                  showTotal: () => `合计${dataTreeStore.pagination.count}条记录`,
                  showSizeChanger: false,
                }}
              />
            </div>
          </Card>
        </div>
      </div>
    </ContentLayout>
  )
}

export default inject('globalStore')(observer(DataTree))
