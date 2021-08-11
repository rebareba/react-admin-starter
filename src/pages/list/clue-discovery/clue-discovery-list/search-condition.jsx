import {useEffect} from 'react'
import {config, history} from '@utils'
import {observer} from 'mobx-react'
import {Select, Button, Input, message} from 'antd'
import {CloseOutlined} from '@ant-design/icons'
import ModalConditionManage from '../componets/modal-condition-manage'
import ModalConditionSave from '../componets/modal-condition-save'
import ConditionSection from '../componets/condition-section'
import ConditionSelected from '../componets/condition-selected'

const {Option} = Select
const {Search} = Input

const SearchCondition = ({store}) => {
  const {
    searchType,
    searchKeyword,
    historySearchs,
    searchTypes,
    conditionsSelected,
    subjectSectionConditions,
    judgementSectionConditions,
    executeSectionConditions,
    punishmentSectionConditions,
  } = store
  useEffect(() => {
    store.getSearchHistories()
  }, [])
  return (
    <div className="searchCondition">
      <div className="fbh fbjs fbac">
        <Select
          className="mr20"
          showSearch
          size="large"
          onChange={store.useHistorySearch}
          style={{width: 250}}
          placeholder="请选择已保存的搜索条件"
          allowClear
          filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        >
          {historySearchs.map((item) => (
            <Option value={item.id} key={item.id}>
              {item.title}
            </Option>
          ))}
        </Select>
        <Select
          value={searchType}
          className="mr20"
          size="large"
          style={{width: 250}}
          onChange={(value) => {
            store.setValue('searchType', value)
          }}
          placeholder="请选择搜索限定类型"
        >
          {searchTypes.map((item) => (
            <Option value={item.value} key={item.value}>
              {item.name}
            </Option>
          ))}
        </Select>
        <Search
          placeholder="输入主体名称、SFZ/组织机构代码、案号、案件名称、内容关键字、SP人员、律师、律所等"
          className="fb1"
          size="large"
          value={searchKeyword}
          style={{maxWidth: 800}}
          onChange={(e) => {
            store.setValue('searchKeyword', e.target.value)
          }}
          onSearch={() => store.getDiscoveryList(1, 'search')}
          enterButton=" 搜索 "
        />
      </div>
      {/* 搜索选择框 */}
      <div className="mt20 conditionSectionWrap">
        <ConditionSection condition={subjectSectionConditions} store={store} />
        <ConditionSection condition={judgementSectionConditions} store={store} />
        <ConditionSection condition={executeSectionConditions} store={store} />
        <ConditionSection condition={punishmentSectionConditions} store={store} />
      </div>
      <div className="conditionSelected" style={{minHeight: 60}}>
        <div className="fbh p10">
          <div className="sectionTitle p10" style={{width: 90}}>
            <span className="ct6a">已选条件:</span>
          </div>
          <div className="fb1 fbh fbw">
            {searchKeyword && (
              <>
                <div className="selectedItem">
                  关键词类型：
                  <span className="item pr4">{searchTypes.find((item) => item.value === searchType)?.name} </span>
                </div>
                <div className="selectedItem">
                  关键词：
                  <span className="item">
                    {searchKeyword}{' '}
                    <CloseOutlined className="ct3" onClick={() => store.setValue('searchKeyword', '')} />
                  </span>
                </div>
              </>
            )}
            <ConditionSelected
              conditionsSelected={conditionsSelected}
              condition={subjectSectionConditions}
              store={store}
            />
            <ConditionSelected
              conditionsSelected={conditionsSelected}
              condition={judgementSectionConditions}
              store={store}
            />
            <ConditionSelected
              conditionsSelected={conditionsSelected}
              condition={executeSectionConditions}
              store={store}
            />
            <ConditionSelected
              conditionsSelected={conditionsSelected}
              condition={punishmentSectionConditions}
              store={store}
            />

            {(store.conditionsSelected.length > 0 || searchKeyword) && (
              <span
                className="pt4 mt6 colorBlue"
                onClick={() => {
                  store.setValue('conditionsSelected', [])
                  store.setValue('searchKeyword', '')
                }}
              >
                清除筛选
              </span>
            )}
          </div>
          <div>
            <Button
              type="primary"
              size="large"
              className="pl30 pr30"
              onClick={() => {
                store.getDiscoveryList(1)
              }}
            >
              筛选
            </Button>
          </div>
        </div>
        <div className="fbh p10">
          <div>
            <Button
              onClick={() => {
                store.setValue('showModal', 'manageSearch')
              }}
            >
              管理搜索条件
            </Button>
            <Button
              onClick={() => {
                if (store.conditionsSelected.length === 0 && !searchKeyword) return
                store.setValue('showModal', 'saveSearch')
              }}
              className="ml10"
            >
              保存搜索条件
            </Button>
          </div>
          <div className="fb1"></div>
        </div>
      </div>
      <ModalConditionManage store={store} />
      <ModalConditionSave store={store} />
    </div>
  )
}

export default observer(SearchCondition)
