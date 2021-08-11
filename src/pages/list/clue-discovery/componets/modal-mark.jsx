import {Modal, Form, Input, Button, Table, Card, Spin, Row, Col} from 'antd'
import {observer} from 'mobx-react'

const {TextArea} = Input

const ModalMark = ({store = {}}) => {
  const {showModal} = store
  const [form] = Form.useForm()
  const saveMark = async () => {
    try {
      const data = await form.validateFields()
      store.setValue('showModal', '')
      await store.saveMark(data.mark)
    } catch (err) {}
  }
  return (
    <Modal
      title="线索标记"
      visible={showModal === 'mark'}
      onCancel={() => store.setValue('showModal', '')}
      onOk={saveMark}
      cancelText="取消"
      width="600px"
    >
      <Form form={form}>
        <Form.Item name="mark" className="" rules={[{required: true, message: '请填写标记内容'}]}>
          <TextArea placeholder="请输入标记内容" rows={10} showCount maxLength={1000} />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default observer(ModalMark)
