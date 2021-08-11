import {observer} from 'mobx-react'
import {useEffect} from 'react'
import {Pagination, Spin} from 'antd'

const ExecutePageList = ({store}) => {
  const {discoveryInfo, executeTableData, judgementSectionConditions} = store
  useEffect(() => {
    if (discoveryInfo.id) {
      store.getExecuteList(1)
    }
  }, [discoveryInfo.id])
  const onChange = (page) => {
    store.getExecuteList(page)
  }
  const download = (record) => {
    store.download(record.filePath, record.fileName)
  }
  return (
    <div className="executeList">
      <div>
        <Spin spinning={executeTableData.loading}>
          {executeTableData.data.map((item, index) => (
            <div className="fbh fbac listItem p10 mb4" key={item.id}>
              <div className="fb1 ">
                <div className="fs20 fw400">
                  <span className="mr10">{(executeTableData.page - 1) * executeTableData.size + index + 1}. </span>
                  {item.infoTitle}
                </div>
                <div className="ml30 mt6 fca">
                  {
                    judgementSectionConditions.conditions
                      .find((i) => i.key === 'court_id')
                      ?.value.find((i) => i.value === item.courtId)?.name
                  }{' '}
                  {item.name} {item.publishDate}
                </div>
              </div>
              <div
                className="p10 fs18"
                onClick={() => {
                  download(item)
                }}
              >
                查看详情
              </div>
            </div>
          ))}
        </Spin>
      </div>
      {executeTableData.total > executeTableData.size && (
        <div className="fbh mt20">
          <div className="fb1"></div>
          <div>
            <Pagination
              current={executeTableData.page}
              pageSize={executeTableData.size}
              total={executeTableData.total}
              onChange={onChange}
            />
          </div>
        </div>
      )}
    </div>
  )
}
export default observer(ExecutePageList)
