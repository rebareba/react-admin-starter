import {observer} from 'mobx-react'
import {useEffect} from 'react'
import {Pagination, Spin} from 'antd'
import {CloseOutlined} from '@ant-design/icons'
import moment from 'moment'

const MarkPageList = ({store}) => {
  const {discoveryInfo, markTableData, userInfo} = store
  console.log(userInfo)
  useEffect(() => {
    if (discoveryInfo.id) {
      store.getMarkList(1)
    }
  }, [discoveryInfo.id])
  const onChange = (page) => {
    store.getMarkList(page)
  }
  return (
    <div>
      <div>
        <Spin spinning={markTableData.loading}>
          {markTableData.data.map((item, index) => (
            <div className="fbh fbac listItem p10 mb4" key={item.id}>
              <div className="fb1 ">
                <div className="fs20 fw400">
                  <span className="mr10">{(markTableData.page - 1) * markTableData.size + index + 1}. </span>
                  {item.content}
                </div>
                <div className="ml30 mt6 fca">
                  {item.userVO && `${item.userVO.unitName}-${item.userVO.dept}-${item.userVO.nickname}`}
                  {moment(item.ctime).format('YYYY-MM-DD HH:mm:ss')}
                </div>
              </div>
              {userInfo.userId === item.userId && (
                <div className="p10 fs18">
                  <CloseOutlined
                    onClick={() => {
                      store.deleteMark(item)
                    }}
                  />
                </div>
              )}
            </div>
          ))}
        </Spin>
      </div>
      {markTableData.total > markTableData.size && (
        <div className="fbh mt20">
          <div className="fb1"></div>
          <div>
            <Pagination
              current={markTableData.page}
              pageSize={markTableData.size}
              total={markTableData.total}
              onChange={onChange}
            />
          </div>
        </div>
      )}
    </div>
  )
}
export default observer(MarkPageList)
