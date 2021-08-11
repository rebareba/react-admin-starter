import {useState} from 'react'

import {Modal, Form, Input, Button} from 'antd'
import {observer} from 'mobx-react'
import ConditionSelected from './condition-selected'

const ModalConditionSave = ({store = {}}) => {
  const {
    searchTypes,
    searchType,
    showModal,
    conditionsSelected,
    subjectSectionConditions,
    judgementSectionConditions,
    executeSectionConditions,
    punishmentSectionConditions,
    searchKeyword,
  } = store
  const [name, setName] = useState('')
  const saveSearch = () => {
    if (!name) return
    store.saveSearchHistory(name)
    store.setValue('showModal', '')
  }
  const [form] = Form.useForm()
  return (
    <Modal
      title="保存搜索条件"
      visible={showModal === 'saveSearch'}
      onOk={saveSearch}
      onCancel={() => store.setValue('showModal', '')}
      cancelText="取消"
      width="800px"
    >
      <div>
        <Form form={form}>
          <Form.Item name="username" rules={[{required: true, message: '请命名保存的搜索条件'}]}>
            <Input
              size="large"
              placeholder="命名保存的搜索条件"
              value={name}
              onChange={(e) => {
                setName(e.target.value)
              }}
            />
          </Form.Item>
        </Form>
        <div className="fbh mt20">
          <div className="pl10" style={{width: 90, lineHeight: '30px'}}>
            <span className="ct6a">已选条件:</span>
          </div>
          <div className="conditionSelected fb1 fbh fbw">
            {searchKeyword && (
              <>
                <div className="selectedItem">
                  关键词类型：
                  <span className="item pr4">{searchTypes.find((item) => item.value === searchType)?.name} </span>
                </div>
                <div className="selectedItem">
                  关键词：
                  <span className="item">{searchKeyword} </span>
                </div>
              </>
            )}
            <ConditionSelected
              conditionsSelected={conditionsSelected}
              showDelete={false}
              condition={subjectSectionConditions}
              store={store}
            />
            <ConditionSelected
              conditionsSelected={conditionsSelected}
              showDelete={false}
              condition={judgementSectionConditions}
              store={store}
            />
            <ConditionSelected
              conditionsSelected={conditionsSelected}
              showDelete={false}
              condition={executeSectionConditions}
              store={store}
            />
            <ConditionSelected
              conditionsSelected={conditionsSelected}
              showDelete={false}
              condition={punishmentSectionConditions}
              store={store}
            />
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default observer(ModalConditionSave)
