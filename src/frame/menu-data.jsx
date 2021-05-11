import {
  HomeOutlined,
  TableOutlined,
  StarOutlined,
  SmileOutlined,
  BarChartOutlined,
  AppstoreOutlined,
} from '@ant-design/icons'
import * as constant from '@common/constant'
import {config} from '@utils'

import Home from '@pages/home'

// ui
import Buttons from '@pages/ui/buttons'
import Icons from '@pages/ui/icons'
import Spins from '@pages/ui/spins'

// table
import BaseTable from '@pages/table/base-table'

// chart
import Echarts from '@pages/chart/echarts'
import D3s from '@pages/chart/d3s'

// useful

import UserList from '@pages/useful/user-list'

const {pathPrefix} = config

/**
 * 关于菜单的配置
 * @param (string)    name        名称
 * @param (string)    url         访问路径也是key， 菜单是key 确保唯一
 * @param (string)    icon        图标 第一层菜单才需要
 * @param (Component) component？ 组件 菜单不需要
 * @param (Array)     children    子菜单
 * @param (Boolean)   isMenu      是否是菜单还是功能页面 功能也可以在子页面做
 * @param (string)    key？         权限key   无表示通用页面大家都有权限
 * @param (number)    permission？  和用户对于的权限key 进行&运算 确定是否有访问权限
 *
 */
export default [
  {
    name: '首页',
    url: `${pathPrefix}/home`,
    icon: <HomeOutlined />,
    component: Home,
    isMenu: true,
  },
  {
    name: 'UI',
    url: '/ui',
    icon: <SmileOutlined />,
    children: [
      {
        name: '按钮',
        url: `${pathPrefix}/ui/buttons`,
        component: Buttons,
        isMenu: true,
      },
      {
        name: '图标',
        url: `${pathPrefix}/ui/icons`,
        component: Icons,
        isMenu: true,
      },
      {
        name: '加载中',
        url: `${pathPrefix}/ui/spins`,
        isMenu: true,
        component: Spins,
        key: 'user',
        permission: 1,
      },
    ],
  },
  {
    name: '表格',
    url: '/table',
    icon: <TableOutlined />,
    children: [
      {
        name: '基础表格',
        url: `${pathPrefix}/table/base_table`,
        component: BaseTable,
        isMenu: true,
      },
    ],
  },
  {
    name: '图表',
    url: '/chart',
    icon: <BarChartOutlined />,
    children: [
      {
        name: 'Echarts',
        url: `${pathPrefix}/chart/echarts`,
        component: Echarts,
        isMenu: true,
      },
      {
        name: 'D3s',
        url: `${pathPrefix}/chart/d3s`,
        component: D3s,
        isMenu: true,
      },
    ],
  },
  {
    name: '常见页面实现',
    url: '/useful',
    icon: <StarOutlined />,
    children: [
      {
        name: '用户管理',
        url: `${pathPrefix}/useful/user_list`,
        component: UserList,
        isMenu: true,
      },
    ],
  },
  {
    name: '其他',
    url: '/other',
    icon: <AppstoreOutlined />,
    children: [
      {
        name: '多级菜单',
        url: '/other/menu',
        children: [
          {
            name: '菜单1 ',
            url: `${pathPrefix}/other/menu/first`,
            isMenu: true,
            component: Home,
          },
          {
            name: `菜单2权限${constant.Modules.USER}:${constant.Permission.VIEW} `,
            url: `${pathPrefix}/other/menu/second`,
            isMenu: true,
            component: Home,
            key: constant.Modules.USER,
            permission: constant.Permission.VIEW,
          },
          {
            name: '三级菜单 ',
            url: `${pathPrefix}/other/menu/third`,
            isMenu: true,
            children: [
              {
                name: '菜单1 ',
                url: `${pathPrefix}/other/menu/third/first`,
                isMenu: true,
                component: Home,
              },
            ],
          },
        ],
      },
    ],
  },
]
