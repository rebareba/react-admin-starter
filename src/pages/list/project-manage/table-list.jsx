import {observer, inject} from 'mobx-react'
import {Button, Select, Input, Table, Modal, Tooltip} from 'antd'

const {confirm} = Modal

const TableList = ({store}) => {
  const renderColumn = (txt) => {
    return (
      <Tooltip placement="top" title={txt}>
        <div className="omit2 hand">{txt}</div>
      </Tooltip>
    )
  }
  const deleteConfirm = (projectId) => {
    const {store} = this
    confirm({
      title: '你确定要删除这个项目吗？',
      content: '',
      onOk() {
        store.deleteProject(projectId)
      },
      onCancel() {},
    })
  }
  const columns = [
    {
      title: '项目名称',
      dataIndex: 'name',
      render: (txt, record) => (
        <Tooltip placement="top" title={txt}>
          <div
            className="blue omit2 hand"
            onClick={() => {
              store.set({
                visibleModal: 'projectDetailModal',
                record,
              })
            }}
            title={txt}
          >
            {txt}
          </div>
        </Tooltip>
      ),
      width: 130,
    },
    {
      title: '项目编号',
      dataIndex: 'code',
      width: 120,
      render: (txt) => renderColumn(txt),
    },
    {
      title: '项目类型',
      dataIndex: 'type',
      width: 100,
      render: (txt) => renderColumn(txt),
    },
    {
      title: '项目状态',
      dataIndex: 'status',
      width: 110,
      render: (txt) => renderColumn(txt),
    },
    {
      title: '项目经理',
      dataIndex: 'pm',
      render: (txt) => renderColumn(txt.map((item) => item.userName).join('、')),
    },
    {
      title: '技术经理',
      dataIndex: 'technician',
      render: (txt) => renderColumn(txt.map((item) => item.userName).join('、')),
    },
    {
      title: '关联商机',
      dataIndex: 'opportunity',
      render: (txt) => renderColumn(txt && txt.name),
    },
    {
      title: '项目成员',
      dataIndex: 'member',
      render: (txt) => renderColumn(txt.map((item) => item.userName).join('、')),
    },
    store.type !== 'myself' && {
      title: '操作',
      width: 140,
      // PMO可编辑所有项目的所有项，项目管理部普通成员可以编辑所有项目的部分项，非项目管理部项目负责人可以编辑自己负责项目
      // 只有PMO才能启动和结束
      // 只有PMO才能删除
      render: (txt, record) => (
        <div>
          <a
            className="blue mr8"
            disabled={false}
            onClick={() => {
              store.setValue('visibleModal', 'manageSearch')
            }}
          >
            编辑
          </a>
          <a
            className="blue mr8"
            disabled={false}
            onClick={() => {
              store.setValue('visibleModal', 'manageSearch')
            }}
          >
            {record.state === 2 ? '启动' : '结束'}
          </a>
          <a className="blue" disabled={false} onClick={() => deleteConfirm(record.projectId)}>
            删除
          </a>
        </div>
      ),
    },
    // store.type === 'myself' && {
    //   title: '操作',
    //   width: 140,
    //   // PMO可编辑所有项目的所有项，项目管理部普通成员可以编辑所有项目的部分项，非项目管理部项目负责人可以编辑自己负责项目
    //   // 只有PMO才能启动和结束
    //   // 只有PMO才能删除
    //   render: (txt, record) => (
    //     <div>
    //       <a
    //         disabled={!record.isPm}
    //         className="blue mr8"
    //         onClick={() => {
    //           columns
    //         }}
    //       >
    //         编辑成员
    //       </a>
    //       <a disabled={!record.isPm} className="blue mr8" onClick={() => changeStage(record)}>
    //         阶段计划
    //       </a>
    //       <a disabled={!record.isPm} className="blue" onClick={() => changeMilestone(record)}>
    //         里程碑
    //       </a>
    //     </div>
    //   ),
    // },
  ].filter(Boolean)

  const tableProps = {
    columns,
    rowKey: (item) => item.projectId,
    loading: store.tableData.loading,
    bordered: true,
    dataSource: store.tableData.data,
    // size: 'larger',
    className: 'afixed-table',
    // scroll: {x: 2100},
    // 分页排序筛选变化时候
    onChange: store.tableChange,
    // scroll: {x: 2000},
    pagination: {
      showTotal: (total) => `共${total}条`,
      total: store.tableData.count,
      // showQuickJumper: true,
      // showSizeChanger: true,
      pageSize: store.tableData.size,
      // onShowSizeChange: store.tableSizeChang,
      current: store.tableData.page,
    },
  }
  return <Table {...tableProps} />
}

export default observer(TableList)
