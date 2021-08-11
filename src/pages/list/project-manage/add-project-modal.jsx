import {observer} from 'mobx-react'
import {Modal, Spin, Form, Input, Select, Radio, DatePicker} from 'antd'
import moment from 'moment'
import {log} from '@utils'
import {useEffect, useState} from 'react'

const RadioGroup = Radio.Group
const FormItem = Form.Item
const {Option} = Select
const {RangePicker} = DatePicker
const {TextArea} = Input
const formItemLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 19,
  },
  // colon: true,
}

const AddProjectModal = ({store}) => {
  const [form] = Form.useForm()
  const {
    visibleModal,
    projectDetail,
    isViewProject,
    loadingDetail,
    allUser = [],
    allNoProject = [],
    conditionConfig,
  } = store
  const {stageList, statusList, liftStateList, typeList, securityLevelList, mileList} = conditionConfig
  const {opportunity, pmWeeklySwitch, pmWeeklyOwner = {}} = projectDetail
  const pmInit =
    projectDetail.pm?.map((item) => {
      return {
        key: item.userId,
        label: item.userName,
      }
    }) || []
  const [pmWeeklySwitchValue, setPmWeeklySwitchValue] = useState('')
  const [pmWeeklyOwnerList, setPmWeeklyOwnerList] = useState([])
  const [statusOtherVisible, setStatusOtherVisible] = useState(projectDetail.statusOther === 99)
  const allNoProjectNew = allNoProject.slice()
  if (opportunity && opportunity.id !== 'NO_OPPORTUNITY') {
    allNoProjectNew.push(opportunity)
  }

  useEffect(() => {
    store.getAllUserOpportunity()
  }, [])
  return (
    <Modal
      visible={visibleModal === 'addProjectModal'}
      title={isViewProject ? '新建项目' : '编辑项目'}
      maskClosable={false}
      className="add-project"
      id="J_add_project"
      onCancel={() =>
        store.set({
          visibleModal: '',
          projectDetail: {},
          isEditProject: false,
        })
      }
      width="600px"
      // onOk={this.handleSubmit}
    >
      <Form form={form} {...formItemLayout}>
        <FormItem
          label="项目名称"
          initialValue={projectDetail.name}
          name="name"
          rules={[
            {
              required: true,
              message: '请输入项目名称',
            },
            {
              min: 2,
              message: '名称长度为2~32个字符',
            },
            {
              max: 32,
              message: '名称长度为2~32个字符',
            },
          ]}
        >
          <Input disabled={isViewProject} placeholder="请输入" />
        </FormItem>
        <FormItem
          label="项目编号"
          name="code"
          initialValue={projectDetail.code}
          rules={[
            {
              required: true,
              message: '请输入项目编号',
            },
          ]}
        >
          <Input disabled={isViewProject} placeholder="请输入项目编号" />
        </FormItem>
        <FormItem
          name="securityLevel"
          initialValue={projectDetail.securityLevel || undefined}
          rules={[]}
          label="项目级别"
        >
          <Select
            placeholder="请选择项目级别"
            getPopupContainer={() => document.getElementsByClassName('add-project')[0]}
          >
            {securityLevelList.map((item) => (
              <Option value={item.id} key={item.id}>
                {item.name}
              </Option>
            ))}
          </Select>
        </FormItem>
        <FormItem
          name="type"
          initialValue={projectDetail.code}
          rules={[
            {
              required: true,
              message: '请选择项目类型',
            },
          ]}
          label="项目类型"
        >
          <Select
            placeholder="请选择"
            // getPopupContainer={() => document.getElementsByClassName('add-project')[0]}
          >
            {typeList.slice(1).map((item) => (
              <Option value={item.id} key={item.id}>
                {item.name}
              </Option>
            ))}
          </Select>
        </FormItem>
        <FormItem
          name="status"
          initialValue={projectDetail.status}
          rules={[
            {
              required: true,
              message: '请选择项目状态',
            },
          ]}
          label="项目状态"
        >
          <Select
            placeholder="请选择"
            // getPopupContainer={() => document.getElementsByClassName('add-project')[0]}
            onChange={(value) => {
              if (value === 99) {
                setStatusOtherVisible(true)
              } else {
                setStatusOtherVisible(false)
              }
            }}
            disabled={isViewProject}
          >
            {statusList.slice(1).map((item) => (
              <Option value={item.id} key={item.id}>
                {item.name}
              </Option>
            ))}
          </Select>
        </FormItem>
        {statusOtherVisible && (
          <div className="pl80">
            <FormItem
              name="statusOther"
              initialValue={projectDetail.statusOther}
              rules={[
                {
                  required: true,
                  message: '请输入详细备注',
                },
              ]}
            >
              <Input placeholder="请输入详细备注" />
            </FormItem>
          </div>
        )}
        <FormItem
          name="pm"
          initialValue={pmInit}
          rules={[
            {
              required: true,
              message: '请选择项目经理',
            },
          ]}
          label="项目经理"
        >
          <Select
            showSearch
            placeholder="请选择"
            labelInValue
            optionFilterProp="children"
            // onChange={this.changePm}
            // getPopupContainer={() => document.getElementsByClassName('add-project')[0]}
          >
            {allUser.map((item) => (
              <Option value={item.userId}>{item.userName}</Option>
            ))}
          </Select>
        </FormItem>
        <FormItem
          name="technician"
          initialValue={projectDetail.technician?.map((item) => parseInt(item.userId, 10))}
          rules={[]}
          label="技术经理"
        >
          <Select
            placeholder="请选择"
            mode="multiple"
            optionFilterProp="children"
            // getPopupContainer={() => document.getElementsByClassName('add-project')[0]}
          >
            {allUser.map((item) => (
              <Option value={item.userId}>{item.userName}</Option>
            ))}
          </Select>
        </FormItem>
        <FormItem
          name="member"
          initialValue={projectDetail.member?.map((item) => parseInt(item.userId, 10))}
          rules={[
            {
              required: true,
              message: '请选择项目成员',
            },
          ]}
          label="项目成员"
        >
          <Select
            placeholder="请选择"
            mode="multiple"
            optionFilterProp="children"
            // getPopupContainer={() => document.getElementsByClassName('add-project')[0]}
          >
            {allUser.map((item) => (
              <Option value={item.userId}>{item.userName}</Option>
            ))}
          </Select>
        </FormItem>
        <FormItem
          name="time"
          initialValue={
            projectDetail.startAt && projectDetail.endAt && [moment(projectDetail.startAt), moment(projectDetail.endAt)]
          }
          rules={[
            {
              required: true,
              message: '请选择项目时间',
            },
          ]}
          label="项目时间"
        >
          <RangePicker style={{width: '100%'}} />
        </FormItem>
        <FormItem
          name="descr"
          initialValue={projectDetail.descr || ''}
          rules={[
            {
              max: 200,
              message: '不超过200个字',
            },
          ]}
          label="项目描述"
        >
          <TextArea rows={4} placeholder="请输入项目描述，不超过200个字" />
        </FormItem>
        <FormItem
          name="opportunityId"
          initialValue={projectDetail.opportunity && projectDetail.opportunity.id}
          rules={[
            {
              required: true,
              message: '请选择商机',
            },
          ]}
          label="关联商机"
        >
          <Select
            placeholder="请选择"
            showSearch
            // getPopupContainer={() => document.getElementsByClassName('add-project')[0]}
            disabled={isViewProject}
            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
            {allNoProjectNew.slice().map((item) => (
              <Option value={item.id}>{item.name}</Option>
            ))}
          </Select>
        </FormItem>
        <FormItem {...formItemLayout} label="项目经理周报">
          <div>
            <FormItem
              name="pmWeeklySwitch"
              initialValue={pmWeeklySwitchValue || pmWeeklySwitch || 'N'}
              rules={[
                {
                  required: true,
                  message: '请选择项目经理周报开关',
                },
              ]}
              style={{display: 'inline-block', width: '110px', marginBottom: 0}}
            >
              <RadioGroup
                onChange={(v) => {
                  log(v)
                }}
                size="small"
              >
                <Radio value="Y">是</Radio>
                <Radio value="N">否</Radio>
              </RadioGroup>
            </FormItem>
            <div style={{display: 'inline-block'}}>
              <FormItem
                name="pmWeeklyOwner"
                initialValue={pmWeeklyOwner === 0 ? undefined : pmWeeklyOwner.userId}
                rules={[
                  {
                    required: (pmWeeklySwitchValue || pmWeeklySwitch || 'N') === 'Y',
                    message: '维护者人员为项目经理已选列表',
                  },
                ]}
                style={{width: '250px'}}
                label="维护者"
                {...formItemLayout}
              >
                <Select
                  placeholder="请选择"
                  showSearch
                  disabled={(pmWeeklySwitchValue || pmWeeklySwitch || 'N') === 'N'}
                  // getPopupContainer={() => document.getElementsByClassName('add-project')[0]}
                >
                  {pmWeeklyOwner !== 0 && pmWeeklyOwnerList.length === 0
                    ? pmInit.map((item) => <Option value={item.key}>{item.label}</Option>)
                    : pmWeeklyOwnerList.map((item) => <Option value={item.key}>{item.label}</Option>)}
                </Select>
              </FormItem>
            </div>
          </div>
        </FormItem>
      </Form>
    </Modal>
  )
}
export default observer(AddProjectModal)
