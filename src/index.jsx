import React, {Suspense} from 'react'
import * as ReactDOM from 'react-dom'
import {ConfigProvider} from 'antd'
import zhCN from 'antd/es/locale-provider/zh_CN'
import {Router, Route, Switch, Redirect} from 'react-router-dom'
import {Provider} from 'mobx-react'

import '@common/flexbox.styl'
import '@common/common.styl'
import '@common/colors.styl'
import '@icons'

import {config, history, getPageRoutes} from '@utils'

import GlobalStore from '@common/global-store'

import Login from '@pages/login'
import Frame from '@src/frame'
import menuData from '@src/frame/menu-data'

const globalStore = new GlobalStore()

console.log('globalStore', globalStore)
const stores = {globalStore}

const App = () => {
  const {pathPrefix} = config
  return (
    <Suspense fallback="加载中">
      <Router history={history}>
        <Switch>
          <Route path={`${pathPrefix}/login`} component={Login} />
          <Frame>
            <Switch>
              {getPageRoutes(menuData).map((route) => {
                return <Route path={route.url} component={route.component} key={route.url} />
              })}
              <Redirect from="/" to={`${pathPrefix}/home`} />
              <Redirect from={pathPrefix} to={`${pathPrefix}/home`} />
            </Switch>
          </Frame>
        </Switch>
      </Router>
    </Suspense>
  )
}
ReactDOM.render(
  <ConfigProvider locale={zhCN}>
    <Provider {...stores}>
      <App />
    </Provider>
  </ConfigProvider>,
  document.getElementById('root'),
)
