/* eslint-disable eqeqeq */
/*
 * @Author: changfeng
 * @LastEditors: changfeng
 * @LastEditTime: 2021-07-29 17:03:34
 * @Description: 已经选择的筛选条件
 */

import {observer} from 'mobx-react'
import {CloseOutlined} from '@ant-design/icons'
import cls from 'classnames'

const ConditionSelected = ({store, condition, conditionsSelected = [], showDelete = true}) => {
  const {conditions, sectionKey} = condition
  const removeSelected = (selectedItem) => {
    store.setValue(
      'conditionsSelected',
      conditionsSelected
        .slice()
        .filter(
          (item) => item.sectionKey !== sectionKey || item.key !== selectedItem.key || item.value != selectedItem.value,
        ),
    )
  }
  return (
    <>
      {conditions.map((ele) => {
        const selected = conditionsSelected.slice().filter((i) => {
          return i.sectionKey === sectionKey && i.key === ele.key
        })
        if (selected.length) {
          return (
            <div className="selectedItem">
              {ele.title}：
              {selected.map((item, index) => {
                return (
                  <span className={cls('item', {itemBorder: selected.length !== index + 1})} key={index}>
                    {item.name}
                    {item.type === 'custom' &&
                      `: ${item.startData === null ? '' : item.startData} ~ ${
                        item.endData === null ? '' : item.endData
                      } ${item.customUnit}`}
                    {showDelete && <CloseOutlined className="ct3 ml2" onClick={() => removeSelected(item)} />}
                  </span>
                )
              })}
            </div>
          )
        }
        return ''
      })}
    </>
  )
}
export default observer(ConditionSelected)
