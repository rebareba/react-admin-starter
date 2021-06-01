import {useEffect} from 'react'
import {observer, inject} from 'mobx-react'
import {
  Modal,
  Spin,
  Form,
  Input,
  Button,
  Radio,
  Select,
  Cascader,
  DatePicker,
  InputNumber,
  TreeSelect,
  Switch,
} from 'antd'

import dataSimpleStore from './data-simple-store'

const DataSimpleModal = () => {
  const {isEdit, modalVisible, submiting, detail} = dataSimpleStore
  const [form] = Form.useForm()
  useEffect(() => {
    if (form) form.resetFields()
  }, [])
  const handleOnOk = () => {}
  const handleOnCancel = () => {
    dataSimpleStore.set('modalVisible', false)
    // dataSimpleStore.taggleVisable()
  }

  const modalProps = {
    title: isEdit ? '编辑' : '新建',
    visible: modalVisible,
    maskClosable: false,
    width: 520,
    destroyOnClose: true,
    onOk: handleOnOk,
    onCancel: handleOnCancel,
    confirmLoading: submiting,
  }

  // const onFormChange = ({size}) => {}
  return (
    <Modal {...modalProps}>
      <Spin spinning={submiting}>
        <Form
          form={form}
          labelCol={{
            span: 5,
          }}
          wrapperCol={{
            span: 14,
          }}
          layout="horizontal"
          initialValues={{}}
          // onValuesChange={onFormChange}
          // size='default'
        >
          <Form.Item label="Input">
            <Input />
          </Form.Item>
          <Form.Item label="Select">
            <Select>
              <Select.Option value="demo">Demo</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="TreeSelect">
            <TreeSelect
              treeData={[
                {
                  title: 'Light',
                  value: 'light',
                  children: [
                    {
                      title: 'Bamboo',
                      value: 'bamboo',
                    },
                  ],
                },
              ]}
            />
          </Form.Item>
          <Form.Item label="Cascader">
            <Cascader
              options={[
                {
                  value: 'zhejiang',
                  label: 'Zhejiang',
                  children: [
                    {
                      value: 'hangzhou',
                      label: 'Hangzhou',
                    },
                  ],
                },
              ]}
            />
          </Form.Item>
          <Form.Item label="DatePicker">
            <DatePicker />
          </Form.Item>
          <Form.Item label="InputNumber">
            <InputNumber />
          </Form.Item>
          <Form.Item label="Switch">
            <Switch />
          </Form.Item>
          <Form.Item label="Button">
            <Button>Button</Button>
          </Form.Item>
        </Form>
      </Spin>
    </Modal>
  )
}
export default observer(DataSimpleModal)
