import {observer} from 'mobx-react'
import {useEffect} from 'react'
import {Pagination, Spin} from 'antd'

const JudgmentPageList = ({store}) => {
  const {discoveryInfo, judgmentTableData, judgementSectionConditions} = store
  useEffect(() => {
    if (discoveryInfo.id) {
      store.getJudgmentList(1)
    }
  }, [discoveryInfo.id])

  const onChange = (page) => {
    store.getJudgmentList(page)
  }
  const download = (record) => {
    store.download(record.filePath, record.fileName)
  }
  return (
    <div>
      <div>
        <Spin spinning={judgmentTableData.loading}>
          {judgmentTableData.data.map((item, index) => (
            <div className="fbh fbac listItem p10 mb4" key={item.id}>
              <div className="fb1 ">
                <div className="fs20 fw400">
                  <span className="mr10">{(judgmentTableData.page - 1) * judgmentTableData.size + index + 1}. </span>
                  {item.docTitle}
                </div>
                <div className="ml30 mt6 fca">
                  {
                    judgementSectionConditions.conditions
                      .find((i) => i.key === 'court_id')
                      ?.value.find((i) => i.value === item.courtId)?.name
                  }
                  {item.docCode} {item.sentenceDate}
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
      {judgmentTableData.size < judgmentTableData.total && (
        <div className="fbh mt20">
          <div className="fb1"></div>
          <div>
            <Pagination
              current={judgmentTableData.page}
              pageSize={judgmentTableData.size}
              total={judgmentTableData.total}
              onChange={onChange}
            />
          </div>
        </div>
      )}
    </div>
  )
}
export default observer(JudgmentPageList)
