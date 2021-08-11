import {useEffect} from 'react'
import {Row, Col, Tabs, Spin} from 'antd'
import {useLocation, useRouteMatch} from 'react-router-dom'

import PunishPageList from '../componets/punish-page-list'
import MarkPageList from '../componets/mark-page-list'
import JudgmentPageList from '../componets/judgment-page-list'
import ExecutePageList from '../componets/execute-page-list'

const {TabPane} = Tabs
const ClueDiscoveryDetail = ({store}) => {
  const location = useLocation()
  const match = useRouteMatch()

  useEffect(() => {
    console.log(
      'load ClueDiscoveryDetailClueDiscoveryDetailClueDiscoveryDetailClueDiscoveryDetailClueDiscoveryDetail',
      location,
      match,
    )
  }, [])

  // console.log('location', location, location.pathname)
  // console.log('match', match, match.params.creditCode)
  const creditCode = match.params.creditCode
  useEffect(() => {
    console.log('ClueDiscoveryDetail', creditCode)
    store.getDiscoverInfo(creditCode)
  }, [creditCode])

  const {discoveryInfo, subjectSectionConditions, loadingDetail} = store
  return (
    <div className="discoverDetail p20">
      <div className="detail">
        <h1 className="fs20"> 线索详情 </h1>
        <div className="leftBorder pl6 fs16 ml6 mt20 mb20">主体信息</div>
        <Spin spinning={loadingDetail}>
          <div>
            <Row>
              <Col span={8} className="fbh">
                <div className="detailTitle">主体名称：</div>
                <div className="detailDesc">{discoveryInfo.subjectName}</div>
              </Col>
              <Col span={8} className="fbh">
                <div className="detailTitle">F定代表：</div>
                <div className="detailDesc">{discoveryInfo.legalPerson}</div>
              </Col>
              <Col span={8} className="fbh">
                <div className="detailTitle">注册资本：</div>
                <div className="detailDesc">
                  {discoveryInfo.registerCapital && (
                    <span>{parseInt(discoveryInfo.registerCapital / 10000, 10) / 100}万</span>
                  )}
                </div>
              </Col>
              <Col span={8} className="fbh">
                <div className="detailTitle">统一社会信用代码：</div>
                <div className="detailDesc">{discoveryInfo.creditCode}</div>
              </Col>
              <Col span={8} className="fbh">
                <div className="detailTitle">行政区域：</div>
                <div className="detailDesc">{discoveryInfo.regionName}</div>
              </Col>
              <Col span={8} className="fbh">
                <div className="detailTitle">实缴资本：</div>
                <div className="detailDesc">
                  {discoveryInfo.paidCapital && <span>{parseInt(discoveryInfo.paidCapital / 10000, 10) / 100}万</span>}
                </div>
              </Col>
              <Col span={8} className="fbh">
                <div className="detailTitle">行业类型：</div>
                <div className="detailDesc">
                  {
                    subjectSectionConditions.conditions
                      .find((i) => i.key === 'trade_field_id')
                      ?.value.find((i) => i.value === discoveryInfo.tradeFieldId)?.name
                  }
                </div>
              </Col>
              <Col span={8} className="fbh">
                <div className="detailTitle">登记状态：</div>
                <div className="detailDesc">
                  {
                    subjectSectionConditions.conditions
                      .find((i) => i.key === 'register_status')
                      ?.value.find((i) => i.value === discoveryInfo.registerStatus)?.name
                  }
                </div>
              </Col>
              <Col span={8} className="fbh">
                <div className="detailTitle">资本类型：</div>
                <div className="detailDesc">{discoveryInfo.capitalType}</div>
              </Col>
              <Col span={8} className="fbh">
                <div className="detailTitle">企业类型：</div>
                <div className="detailDesc">{discoveryInfo.enterpriseTypeName}</div>
              </Col>
              <Col span={8} className="fbh">
                <div className="detailTitle">经营状态：</div>
                <div className="detailDesc">
                  {
                    subjectSectionConditions.conditions
                      .find((i) => i.key === 'operation_status')
                      ?.value.find((i) => i.value === discoveryInfo.operationStatus)?.name
                  }
                </div>
              </Col>
              <Col span={8} className="fbh">
                <div className="detailTitle">纳税信用：</div>
                <div className="detailDesc">{discoveryInfo.taxCredit}</div>
              </Col>
              <Col span={8} className="fbh">
                <div className="detailTitle">组织机构：</div>
                <div className="detailDesc">{discoveryInfo.subjectName}</div>
              </Col>
              <Col span={8} className="fbh">
                <div className="detailTitle">成立时间：</div>
                <div className="detailDesc">{discoveryInfo.foundTime}</div>
              </Col>
              <Col span={8} className="fbh">
                <div className="detailTitle">参保人数：</div>
                <div className="detailDesc">{discoveryInfo.insuredNum}</div>
              </Col>
            </Row>
          </div>
        </Spin>
      </div>
      <div>
        <Tabs centered>
          <TabPane tab="裁判文书" key="judgment">
            <JudgmentPageList store={store} />
          </TabPane>
          <TabPane tab="执行信息" key="execute">
            <ExecutePageList store={store} />
          </TabPane>
          <TabPane tab="行政处罚" key="punish">
            <PunishPageList store={store} />
          </TabPane>
          <TabPane tab="标记信息" key="mark">
            <MarkPageList store={store} />
          </TabPane>
        </Tabs>
      </div>
    </div>
  )
}

export default ClueDiscoveryDetail
