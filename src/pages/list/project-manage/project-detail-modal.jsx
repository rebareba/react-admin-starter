import {observer} from 'mobx-react'
import {Button, Modal, Row, Col, Tag} from 'antd'
import moment from 'moment'

const ProjectDetailModal = ({store, hideProjectType}) => {
  const {visibleModal, record} = store
  const {pm = [], member = [], stage = [], state} = record
  return (
    <Modal
      visible={visibleModal === 'projectDetailModal'}
      title="项目详情"
      className="edit-chance"
      maskClosable={false}
      onCancel={() => store.setValue('visibleModal', '')}
      footer={[
        <Button type="primary" onClick={() => store.setValue('visibleModal', '')}>
          关闭
        </Button>,
      ]}
    >
      <div>
        <Row className="mb8">
          <Col className="ct7" span={4}>
            项目名称
          </Col>
          <Col className="ct1" span={20}>
            <div className="fbh">
              <div className="mr8">{record.name}</div>
              <Tag className={state === 2 ? 'tag-gery' : 'tag-green'}>{state === 2 ? '已结束' : '进行中'}</Tag>
            </div>
          </Col>
        </Row>
        <Row className="mb8">
          <Col className="ct7" span={4}>
            项目编号
          </Col>
          <Col className="ct1" span={20}>
            {record.code}
          </Col>
        </Row>
        {!hideProjectType && (
          <Row className="mb8">
            <Col className="ct7" span={4}>
              项目类型
            </Col>
            <Col className="ct1" span={20}>
              {record.type}
            </Col>
          </Row>
        )}
        <Row className="mb8">
          <Col className="ct7" span={4}>
            项目状态
          </Col>
          <Col className="ct1" span={20}>
            {`${record.status}${record.statusOther ? `（${record.statusOther}）` : ''}`}
          </Col>
        </Row>
        <Row className="mb8">
          <Col className="ct7" span={4}>
            项目经理
          </Col>
          <Col className="ct1" span={20}>
            {pm.map((item) => item.userName).join('、')}
          </Col>
        </Row>
        <Row className="mb8">
          <Col className="ct7" span={4}>
            项目成员
          </Col>
          <Col className="ct1" span={20}>
            {member.map((item) => item.userName).join('、')}
          </Col>
        </Row>
        <Row className="mb8">
          <Col className="ct7" span={4}>
            项目时间
          </Col>
          <Col className="ct1" span={20}>
            {`${moment(record.startAt).format('YYYY-MM-DD')} ~ ${moment(record.endAt).format('YYYY-MM-DD')}`}
          </Col>
        </Row>
        <Row className="mb8">
          <Col className="ct7" span={4}>
            项目描述
          </Col>
          <Col className="ct1" span={20}>
            {record.descr}
          </Col>
        </Row>
        <Row className="mb8">
          <Col className="ct7" span={4}>
            项目阶段
          </Col>
          <Col className="ct1" span={20}>
            <div className="FBV">
              {stage.map((item) => (
                <div>{`${item.stageName}（${item.startAt} ~ ${item.endAt}）`}</div>
              ))}
            </div>
          </Col>
        </Row>
      </div>
    </Modal>
  )
}
export default observer(ProjectDetailModal)
