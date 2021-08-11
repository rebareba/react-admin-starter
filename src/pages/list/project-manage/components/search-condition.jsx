import {observer} from 'mobx-react'
import {Form, Modal, Select, Input} from 'antd'

const {Option} = Select
const {Search} = Input
const {confirm} = Modal
const SearchCondition = ({store}) => {
  const {searchConditionValue, conditionConfig} = store
  const {liftState, stage, type, status, search} = searchConditionValue
  const {stageList, statusList, liftStateList, typeList} = conditionConfig
  return (
    <>
      <Select
        className="filter mr8"
        value={liftState}
        placeholder="生命周期"
        allowClear
        onChange={(val) => store.setSearchConditionValue(val, 'liftState')}
      >
        {liftStateList.map((item) => (
          <Option value={item.id} key={item.id}>
            {item.name}
          </Option>
        ))}
      </Select>
      <Select
        className="filter mr8"
        value={stage}
        placeholder="全部阶段"
        allowClear
        onChange={(val) => store.setSearchConditionValue(val, 'stage')}
        getPopupContainer={() => document.getElementsByClassName('filter')[0]}
      >
        {stageList.map((item) => (
          <Option value={item.id} key={item.id}>
            {item.name}
          </Option>
        ))}
      </Select>
      <Select
        className="filter mr8"
        allowClear
        placeholder="全部类型"
        value={type}
        onChange={(val) => store.setSearchConditionValue(val, 'type')}
        getPopupContainer={() => document.getElementsByClassName('filter')[1]}
      >
        {typeList.map((item) => (
          <Option value={item.id} key={item.id}>
            {item.name}
          </Option>
        ))}
      </Select>
      <Select
        className="filter mr8"
        allowClear
        placeholder="全部状态"
        value={status}
        onChange={(val) => store.setSearchConditionValue(val, 'status')}
        getPopupContainer={() => document.getElementsByClassName('filter')[2]}
      >
        {statusList.map((item) => (
          <Option value={item.id} key={item.id}>
            {item.name}
          </Option>
        ))}
      </Select>
      <Search
        className="search"
        value={search}
        allowClear
        placeholder="请输入项目名称或编号进行搜索"
        onSearch={(e) => store.getProjectList(1)}
        onChange={(e) => store.setSearchConditionValue(e.target.value, 'search')}
      />
    </>
  )
}
export default observer(SearchCondition)
