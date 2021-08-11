/* eslint-disable eqeqeq */
import cls from 'classnames'
import {useState, useEffect} from 'react'
import {Input, InputNumber, DatePicker} from 'antd'
import moment from 'moment'

const {observer} = require('mobx-react')
/*
 * @Author: changfeng
 * @LastEditors: changfeng
 * @LastEditTime: 2021-07-29 17:02:19
 * @Description: 搜索项目的一块 包含tab和筛选条件
 */

const CustomInput = observer(({item, onChange, data}) => {
  let ret = ''

  const [startNumber, setStartNumber] = useState()
  const [endNumber, setEndNumber] = useState()
  const [startDate, setStartDate] = useState()
  const [endDate, setEndDate] = useState()
  // 数值对象或者null
  const changeStartData = (value) => {
    if (item.customType === 'number') {
      if (item.customUnit !== '万') {
        value = parseInt(value, 10)
      }
      if (value > endNumber && endNumber) {
        value = endNumber
      }
      setStartNumber(value)
      onChange({startData: value, endData: endNumber})
    } else if (item.customType === 'date') {
      setStartDate(value)
      onChange({startData: value, endData: endDate})
    }
  }
  const changeEndData = (value) => {
    if (item.customType === 'number') {
      if (item.customUnit !== '万') {
        value = parseInt(value, 10)
      }
      if (value < startNumber && startNumber) {
        value = startNumber
      }
      setEndNumber(value)
      onChange({startData: startNumber, endData: value})
    } else if (item.customType === 'date') {
      setEndDate(value)
      onChange({startData: startDate, endData: value})
    }
  }
  useEffect(() => {
    console.log('useEffect', item, data)
    if (!data) {
      if (item.customType === 'number') {
        setStartNumber(null)
        setEndNumber(null)
      } else if (item.customType === 'date') {
        setStartDate(null)
        setEndDate(null)
      }
    } else if (item.customType === 'number') {
      setStartNumber(data.startData)
      setEndNumber(data.endData)
    } else if (item.customType === 'date') {
      setStartDate(data.startData ? moment(data.startData) : null)
      setEndDate(data.endData ? moment(data.endData) : null)
    }
  }, [item, data])
  switch (item.customType) {
    case 'number': {
      ret = (
        <div>
          <Input.Group compact>
            <Input value="自定义" disabled style={{width: 70}} />
            <InputNumber
              min={0}
              step="1"
              style={{
                width: 65,
              }}
              value={startNumber}
              onChange={changeStartData}
            />
            <Input
              style={{
                width: 35,
                pointerEvents: 'none',
                textAlign: 'center',
                backgroundColor: '#fff',
              }}
              placeholder="~"
              disabled
            />
            <InputNumber
              min={0}
              step="1"
              style={{
                width: 65,
              }}
              max={10000000000}
              value={endNumber}
              onChange={changeEndData}
            />
            <Input
              style={{
                width: 45,
                pointerEvents: 'none',
                textAlign: 'center',
                backgroundColor: '#fff',
              }}
              value={item.customUnit}
              disabled
            />
          </Input.Group>
        </div>
      )
      break
    }
    case 'date': {
      ret = (
        <div>
          <Input.Group compact>
            <Input value="自定义" disabled style={{width: 70}} />
            <DatePicker
              style={{width: 140}}
              onChange={changeStartData}
              value={startDate}
              disabledDate={(current) => {
                return current && endDate && current > endDate.endOf('day')
              }}
            />
            <Input
              style={{
                width: 35,
                pointerEvents: 'none',
                textAlign: 'center',
                backgroundColor: '#fff',
              }}
              placeholder="~"
              disabled
            />
            <DatePicker
              style={{width: 140}}
              onChange={changeEndData}
              value={endDate}
              disabledDate={(current) => {
                return current && startDate && current < startDate.startOf('day')
              }}
            />
            <Input
              style={{
                width: 45,
                pointerEvents: 'none',
                textAlign: 'center',
                backgroundColor: '#fff',
              }}
              value={item.customUnit}
              disabled
            />
          </Input.Group>
        </div>
      )
      break
    }
    default:
      break
  }

  return ret
})

const ConditionSection = ({condition, store}) => {
  const {title, conditions, sectionKey} = condition
  const {conditionsActive, conditionsSelected} = store
  const conditionsSelectedArray = conditionsSelected.slice()

  const changeTab = (item) => {
    const value = conditionsActive[sectionKey] === item.key ? '' : item.key
    store.setActiveCondition(sectionKey, value)
  }
  const activeItem = conditions.find((item) => {
    return item.key === conditionsActive[sectionKey]
  })
  // 有自定义的操作的时候
  const setCustomValue = (data) => {
    console.log('setCustomValue', data, sectionKey, activeItem.key)
    const value = {
      sectionKey,
      key: activeItem.key,
      name: '自定义',
      customUnit: activeItem.customUnit,
      type: 'custom',
    }
    const max = 10000000000
    if (activeItem.customType === 'number') {
      value.startData = data.startData
      value.endData = data.endData
      if (activeItem.customUnit === '万') {
        value.value = [
          parseInt((value.startData || 0) * 1000000, 10),
          parseInt((value.endDate || max) * 1000000, 10),
        ].join(',')
      } else {
        value.value = [value.startData || 0, value.endDate || max].join(',')
      }
    } else if (activeItem.customType === 'date') {
      value.startData = data.startData ? data.startData.format('YYYY-MM-DD') : data.startData
      value.endData = data.endData ? data.endData.format('YYYY-MM-DD') : data.endData
      value.value = [
        data.startData ? data.startData.format('YYYY-MM-DD') : '1970-01-01',
        data.endData ? data.endData.format('YYYY-MM-DD') : '3000-01-01',
      ].join(',')
    }
    const newValue = conditionsSelectedArray.filter((ii) => ii.sectionKey !== sectionKey || ii.key !== activeItem.key)
    newValue.push(value)
    console.log('newValue', newValue)
    store.setValue('conditionsSelected', newValue)
  }

  const customData = conditionsSelectedArray.find(
    (i) => i.sectionKey === sectionKey && i.key === activeItem?.key && i.type === 'custom',
  )
  // 选中Item
  const seletedItem = (item2) => {
    let newValue = []
    if (
      conditionsSelectedArray.find(
        (ii) =>
          ii.sectionKey === sectionKey && ii.key === activeItem.key && ii.value == item2.value && ii.type !== ' custom',
      )
    ) {
      newValue = conditionsSelectedArray.filter(
        (ii) => ii.sectionKey !== sectionKey || ii.key !== activeItem.key || ii.value != item2.value,
      )
    } else {
      newValue = conditionsSelectedArray.filter(
        (ii) => ii.sectionKey !== sectionKey || ii.key !== activeItem.key || ii.type !== 'custom',
      )
      newValue.push({
        ...item2,
        sectionKey,
        key: activeItem.key,
      })
    }
    return store.setValue('conditionsSelected', newValue)
  }
  return (
    <div className="conditionSection mb10">
      <div className="fbh p10">
        <div className="sectionTitle pt8 pl20">
          <span className="ct6a">{title}:</span>{' '}
          <span
            className={cls('ml20 p8', {
              selectAll: !conditionsSelectedArray.find((item) => item.sectionKey === sectionKey),
              pointer: conditionsSelectedArray.find((item) => item.sectionKey === sectionKey),
            })}
            onClick={() => {
              store.setValue(
                'conditionsSelected',
                conditionsSelectedArray.filter((item) => item.sectionKey !== sectionKey),
              )
              store.setActiveCondition(sectionKey, '')
            }}
          >
            不限
          </span>
        </div>
        <div className="fb1 fbh fbw">
          {conditions.map((item) => (
            <div
              key={item.key}
              className={cls('sectionTitleItem', {selected: conditionsActive[sectionKey] === item.key})}
              onClick={() => {
                changeTab(item)
              }}
            >
              {item.title}
            </div>
          ))}
        </div>
      </div>
      {/* 下面是选择项 */}
      <div className={cls('fbh p50 sectionOption', {hide: !conditionsActive[sectionKey]})}>
        <div className="sectionTitle"></div>
        <div className="fb1 fbh fbw fbjsr">
          {activeItem?.value.map((item2) => (
            <div
              className={cls('sectionOptionItem', {
                selected: conditionsSelectedArray.find(
                  // eslint-disable-next-line eqeqeq
                  (ii) => ii.sectionKey === sectionKey && ii.key === activeItem.key && ii.value == item2.value,
                ),
              })}
              onClick={() => {
                seletedItem(item2)
              }}
              key={item2.value}
            >
              {item2.name}
            </div>
          ))}
          {activeItem?.custom && <CustomInput item={activeItem} onChange={setCustomValue} data={customData} />}
        </div>
      </div>
    </div>
  )
}

export default observer(ConditionSection)
