import React, {useEffect} from 'react'
import {
  InputNumber,
  TreeSelect,
  Cascader,
  Button,
  DatePicker,
  TimePicker,
  Switch,
  Form,
  Input,
  Select,
  Checkbox,
  Row,
  Radio,
  Col,
} from 'antd'

const {Password} = Input
const {RangePicker} = DatePicker
const defaultLabelCol = {
  xm: {span: 5},
  lg: {span: 4},
}

const componentMap = {
  input: Input,
  select: Select,
  password: Password,
  switch: Switch,
  inputNumber: InputNumber,
  treeSelect: TreeSelect,
  cascader: Cascader,
  timePicker: TimePicker,
  rangeDatePicker: RangePicker,
  checkbox: Checkbox,
  radioGroup: Radio.Group,
}

const SearchItem = ({
  span = 8,
  name,
  label,
  component,
  initialValue,
  componentProps,
  rules = [],
  labelCol = defaultLabelCol,
}) => {
  const C = componentMap[component]
  if (!C) return null
  return (
    <Col span={span}>
      <Form.Item name={name} label={label} initialValue={initialValue} rules={rules} labelCol={labelCol}>
        {React.createElement(C, componentProps)}
      </Form.Item>
    </Col>
  )
}

const SearchConfg = ({className, searchParams = [], reset, search}) => {
  const [form] = Form.useForm()
  useEffect(() => {
    if (form) form.resetFields()
  }, [])
  const onSearch = async (e) => {
    try {
      const values = await form.validateFields()
      if (search) search(values, form)
    } catch (err) {
      // console.log(err)
    }
    // if (search) search(values)
  }
  const onReset = () => {
    form.resetFields()
    if (reset) reset(form)
  }
  return (
    <div className={className}>
      <Form form={form} name="control-hooks">
        <Row gutter={8}>
          {searchParams.map((item) => (
            <SearchItem {...item} span="8" key={item.name} />
          ))}
          <Col span="24">
            <div className="fbh fbac fbje">
              <Button htmlType="button" onClick={onReset}>
                重置
              </Button>
              <Button className="ml8" type="primary" onClick={onSearch}>
                查询
              </Button>
            </div>
          </Col>
        </Row>
      </Form>
    </div>
  )
}
export default SearchConfg
