import {Link, useRouteMatch} from 'react-router-dom'
import {config, history} from '@utils'
import {observer} from 'mobx-react'
import {Table, Popover, Radio, Button, Popconfirm} from 'antd'
import {useEffect} from 'react'
import ModalMark from '../componets/modal-mark'

const DataPageList = ({store}) => {
  const {subjectSectionConditions} = store
  useEffect(() => {
    store.getDiscoveryList(1)
  }, [])
  const {path} = useRouteMatch()
  const columns = [
    {
      title: '主体名称',
      dataIndex: 'subjectName',
      fixed: 'left',
      width: 150,
      // fixed: 'left',
      // render: (text, record, index) => index + 1,
    },
    {
      title: '统一社会信用码',
      dataIndex: 'creditCode',
      width: 100,
    },
    {
      title: '行政区域',
      dataIndex: 'regionName',
      width: 100,
    },
    {
      title: '企业类型',
      dataIndex: 'enterpriseTypeName',
      width: 100,
    },
    {
      title: 'F定代表',
      dataIndex: 'legalPerson',
    },
    {
      title: '登记状态',
      dataIndex: 'registerStatus',
      render: (text, record, index) => {
        return (
          <p>
            {
              subjectSectionConditions.conditions
                .find((i) => i.key === 'register_status')
                ?.value.find((i) => i.value === text)?.name
            }
          </p>
        )
      },
    },
    {
      title: '经营状态',
      dataIndex: 'operationStatus',
      render: (text, record, index) => {
        return (
          <p>
            {
              subjectSectionConditions.conditions
                .find((i) => i.key === 'operation_status')
                ?.value.find((i) => i.value === text)?.name
            }
          </p>
        )
      },
    },
    {
      title: '成立时间',
      dataIndex: 'foundTime',
    },
    {
      title: '注册资本',
      dataIndex: 'registerCapital',
      width: 100,
      render: (text, record, index) => {
        if (text) {
          return <span>{parseInt(text / 10000, 10) / 100}万</span>
        }
        return ''
      },
    },
    {
      title: '实缴资本',
      dataIndex: 'paidCapital',
      render: (text, record, index) => {
        if (text) {
          return <span>{parseInt(text / 10000, 10) / 100}万</span>
        }
        return ''
      },
    },
    {
      title: '行政处罚',
      key: 'punishCode',
      width: 200,
      render: (text, record, index) => {
        return (
          <p>
            <span className="colorBlue">{record.punishCode} </span>
            {record.punishTitle}
          </p>
        )
      },
    },
    {
      title: '裁判文书',
      key: 'docCode',
      width: 200,
      render: (text, record, index) => {
        return (
          <p>
            <span className="colorBlue">{record.docCode} </span>
            {record.docTitle}
          </p>
        )
      },
    },
    {
      title: '执行信息',
      key: 'infoCode',
      width: 200,
      render: (text, record, index) => {
        return (
          <p>
            <span className="colorBlue">{record.infoCode} </span>
            {record.infoTitle}
          </p>
        )
      },
    },
    {
      title: '执行恢复',
      key: 'process',
      dataIndex: 'id',
      width: 200,
      render: (text, record, index) => {
        return (
          <p>
            <span className="colorBlue">{record.resumeCode} </span>
            {record.resumeTitle}
          </p>
        )
      },
    },
    {
      title: '是否标记',
      dataIndex: 'isSign',
      render: (text, record, index) => {
        return <span>{text === 1 ? '是' : '否'}</span>
      },
    },
    {
      title: '操作',
      key: 'action',
      width: 110,
      fixed: 'right',
      render: (text, record, index) => {
        return (
          <div>
            <Link to={`${path}/${record.creditCode}`}>查看</Link>

            {record.isSign === 0 && (
              <Button
                type="link"
                size="small"
                onClick={() => {
                  store.setValue('showModal', 'mark')
                  store.setValue('discoveryInfo', record)
                }}
              >
                标记
              </Button>
            )}
          </div>
        )
      },
    },
  ]
  const tableProps = {
    columns,
    rowKey: (item) => `${item.id}`,
    loading: store.tableData.loading,
    bordered: true,
    dataSource: store.tableData.data,
    size: 'larger',
    className: 'app-list-table',
    // scroll: {x: 2100},
    // 分页排序筛选变化时候
    onChange: store.tableChange,
    scroll: {x: 2000},
    pagination: {
      showTotal: (total) => `共${total}条`,
      total: store.tableData.count,
      showQuickJumper: true,
      showSizeChanger: true,
      pageSize: store.tableData.size,
      // onShowSizeChange: store.tableSizeChang,
      current: store.tableData.page,
    },
  }
  return (
    <div className="mt20">
      <Table {...tableProps} />
      <ModalMark store={store} />
    </div>
  )
}

export default observer(DataPageList)
