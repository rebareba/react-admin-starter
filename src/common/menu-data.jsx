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

import ProjectManage from '@pages/list/project-manage'
// import ClueDiscovery from '@pages/list/clue-discovery'

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
    name: '查询列表',
    url: '/list',
    icon: <StarOutlined />,
    children: [
      {
        name: '项目管理',
        url: `${pathPrefix}/list/project-manage`,
        component: ProjectManage,
        isMenu: true,
      },
      // {
      //   name: '行政监察',
      //   url: `${pathPrefix}/list/clue-discovery`,
      //   component: ClueDiscovery,
      //   isMenu: true,
      // },
    ],
  },

  // {
  //   name: '其他',
  //   url: '/other',
  //   icon: <AppstoreOutlined />,
  //   children: [
  //     {
  //       name: '多级菜单',
  //       url: '/other/menu',
  //       children: [
  //         {
  //           name: '菜单1 ',
  //           url: `${pathPrefix}/other/menu/first`,
  //           isMenu: true,
  //           component: Home,
  //         },
  //         {
  //           name: `菜单2权限${constant.Modules.USER}:${constant.Permission.VIEW} `,
  //           url: `${pathPrefix}/other/menu/second`,
  //           isMenu: true,
  //           component: Home,
  //           key: constant.Modules.USER,
  //           permission: constant.Permission.VIEW,
  //         },
  //         {
  //           name: '三级菜单 ',
  //           url: `${pathPrefix}/other/menu/third`,
  //           isMenu: true,
  //           children: [
  //             {
  //               name: '菜单1 ',
  //               url: `${pathPrefix}/other/menu/third/first`,
  //               isMenu: true,
  //               component: Home,
  //             },
  //           ],
  //         },
  //       ],
  //     },
  //   ],
  // },
]
