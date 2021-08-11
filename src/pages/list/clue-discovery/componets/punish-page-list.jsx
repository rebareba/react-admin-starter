import {observer} from 'mobx-react'
import {useEffect} from 'react'
import {Pagination, Spin} from 'antd'

const PunishPageList = ({store}) => {
  const {discoveryInfo, punishTableData} = store
  useEffect(() => {
    if (discoveryInfo.id) {
      store.getPunishList(1)
    }
  }, [discoveryInfo.id])
  const onChange = (page) => {
    store.getPunishList(page)
  }
  const download = (record) => {
    store.download(record.filePath, record.fileName)
  }
  return (
    <div>
      <div>
        <Spin spinning={punishTableData.loading}>
          {punishTableData.data.map((item, index) => (
            <div className="fbh fbac listItem p10 mb4" key={item.id}>
              <div className="fb1 ">
                <div className="fs20 fw400">
                  <span className="mr10">{(punishTableData.page - 1) * punishTableData.size + index + 1}. </span>
                  {item.punishTitle}
                </div>
                <div className="ml30 mt6 fca">
                  {item.punishOfficeName} {item.punishCode} {item.publicityDate}
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
      {punishTableData.total > punishTableData.size && (
        <div className="fbh mt20">
          <div className="fb1"></div>
          <div>
            <Pagination
              current={punishTableData.page}
              pageSize={punishTableData.size}
              total={punishTableData.total}
              onChange={onChange}
            />
          </div>
        </div>
      )}
    </div>
  )
}
export default observer(PunishPageList)
