import {Modal, Pagination} from 'antd'
import {observer} from 'mobx-react'
import moment from 'moment'

import ConditionSelected from './condition-selected'

const ModalConditionManage = ({store = {}}) => {
  const {
    showModal,
    historySearchs,
    historySearchCurrent,
    tableHistorySearchs,
    subjectSectionConditions,
    judgementSectionConditions,
    executeSectionConditions,
    punishmentSectionConditions,
    searchTypes,
  } = store
  return (
    <Modal
      title="管理搜索条件"
      visible={showModal === 'manageSearch'}
      onOk={() => store.setValue('showModal', '')}
      onCancel={() => store.setValue('showModal', '')}
      footer={null}
      width="1000px"
    >
      <div>
        <div>
          {tableHistorySearchs.map((item) => {
            return (
              <div className="mb10" key={item.id} style={{border: '1px solid rgba(242, 242, 242, 1)'}}>
                <div
                  className="fbh p6 "
                  style={{borderBottom: '1px solid rgba(242, 242, 242, 1)', backgroundColor: 'rgba(249, 249, 249, 1)'}}
                >
                  <span className="fb1 pl4 fw400">{item.title}</span>
                  <span className="ml4 mr4">{moment(item.ctime).format('YYYY-MM-DD HH:mm:ss')}</span>
                  <a
                    className="ml6 mr4"
                    onClick={() => {
                      store.deleteSearchHistory(item)
                    }}
                  >
                    删除
                  </a>
                </div>
                <div className="fbh p6">
                  <div style={{width: 90, lineHeight: '30px'}}>
                    <span className="ct6a">已选条件:</span>
                  </div>
                  <div className="conditionSelected fb1 fbh fbw">
                    {item.keyword && (
                      <>
                        <div className="selectedItem">
                          关键词类型：
                          <span className="item pr4">
                            {searchTypes.find((item) => item.value === item.type)?.name}{' '}
                          </span>
                        </div>
                        <div className="selectedItem">
                          关键词：
                          <span className="item">{item.keyword} </span>
                        </div>
                      </>
                    )}
                    <ConditionSelected
                      conditionsSelected={item.basSearchTerms.slice() || []}
                      showDelete={false}
                      condition={subjectSectionConditions}
                      store={store}
                      key="subjectSectionConditions"
                    />

                    <ConditionSelected
                      showDelete={false}
                      conditionSelected
                      conditionsSelected={item.basSearchTerms.slice() || []}
                      condition={judgementSectionConditions}
                      store={store}
                      key="judgementSectionConditions"
                    />
                    <ConditionSelected
                      showDelete={false}
                      conditionsSelected={item.basSearchTerms.slice() || []}
                      condition={executeSectionConditions}
                      store={store}
                      key="executeSectionConditions"
                    />
                    <ConditionSelected
                      showDelete={false}
                      conditionsSelected={item.basSearchTerms.slice() || []}
                      condition={punishmentSectionConditions}
                      store={store}
                      key="punishmentSectionConditions"
                    />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        {historySearchs.length > 0 && (
          <div className="fbh mt20">
            <div className="fb1"></div>
            <div>
              <Pagination
                current={historySearchCurrent}
                pageSize={5}
                total={historySearchs.length}
                showTotal={(total, range) => `共${total}条`}
                onChange={(page) => {
                  store.setValue('historySearchCurrent', page)
                }}
              />
            </div>
          </div>
        )}
      </div>
    </Modal>
  )
}

export default observer(ModalConditionManage)
