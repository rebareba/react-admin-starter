import {useState, useEffect, useMemo} from 'react'
import {inject, observer} from 'mobx-react'
import {Spin} from 'antd'
import {useLocation, Route, Switch, useRouteMatch} from 'react-router-dom'
import {config, history} from '@utils'
import './clue-discovery.styl'

import ClueDiscoveryDetail from './clue-discovery-detail'
import ClueDiscoveryList from './clue-discovery-list'
import ClueDiscoveryStore from './store-clue-discovery'

const ClueDiscovery = ({globalStore}) => {
  // const [] = useState(new ClueDiscoveryStore(globalStore.userInfo))

  const store = useMemo(() => {
    return new ClueDiscoveryStore(globalStore.userInfo)
  }, [globalStore])
  const location = useLocation()
  const {path} = useRouteMatch()
  // 获取 path 参数, http://localhost:3000/a/:number
  // const { number } = useParams()

  // console.log(path, url, params)
  // console.log(location)

  useEffect(() => {
    store.getConfig()
  }, [])
  return (
    <div className="pageClueDiscovery">
      <Switch>
        <Route exact path={path} component={(props) => <ClueDiscoveryList {...props} store={store} />} />
        <Route
          exact
          path={`${path}/:creditCode`}
          component={(props) => <ClueDiscoveryDetail {...props} store={store} />}
        />
      </Switch>
    </div>
  )
}

export default inject('globalStore')(observer(ClueDiscovery))
