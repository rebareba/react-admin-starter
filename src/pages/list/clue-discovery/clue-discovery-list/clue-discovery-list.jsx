import {config, history} from '@utils'
import {useEffect} from 'react'
import {Spin} from 'antd'
import {observer} from 'mobx-react'
import SearchCondition from './search-condition'
import DataPageList from './data-page-list'

const ClueDiscoveryList = ({store}) => {
  return (
    <Spin spinning={store.loadingConfig}>
      <div className="clueDiscoveryList p30">
        <SearchCondition store={store} />
        <DataPageList store={store} />
      </div>
    </Spin>
  )
}

export default observer(ClueDiscoveryList)
