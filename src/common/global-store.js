import {runInAction, makeAutoObservable} from 'mobx'
import menuData from '@src/frame/menu-data'
import {getSiderMenu, history, config} from '@utils'
import isString from 'lodash/isString'
import isPlainObject from 'lodash/isPlainObject'
import {createIo} from './create-io'

// 用户登录相关接口配置
const apis = {
  login: {
    method: 'POST',
    url: 'login',
  },
  logout: {
    method: 'POST',
    url: 'auth/logout',
  },
  loginInfo: {
    method: 'GET',
    url: 'login_info',
  },
}
const io = createIo(apis, 'global')

export class GlobalStore {
  // 用户信息
  userInfo

  // 菜单栏
  collapsed = false

  breadcrumb = []

  menu = []

  constructor() {
    // makeObservable(this, {
    //   mobile: observable,
    //   message: observable,
    //   loading: observable,
    //   password: observable,
    //   login: action,
    //   setMobile: action,
    //   setPassword: action,
    // })
    makeAutoObservable(this)
  }

  get userMenu() {
    if (this.userInfo) {
      return getSiderMenu(menuData, this.userInfo.permissions)
    }
    return []
  }

  setBreadcrumb(breadcrumb = []) {
    this.breadcrumb = breadcrumb
  }

  async loginInfo() {
    if (this.userInfo) return
    const {success, content} = await io.loginInfo()
    if (!success) return
    runInAction(() => {
      this.userInfo = content
    })
  }

  // 获取当前的登录信息
  async login(mobile, password) {
    const {success, content, message} = await io.login({
      mobile,
      password,
    })
    // 高级调用方式
    // const {success, content} = await io.login({
    //   [rejectToData]: true,
    //   data: login,
    //   params: {user: 1, ':userId': 2},
    // })
    if (success) {
      runInAction(() => {
        this.userInfo = content
      })
      const querys = new URLSearchParams(history.location.search)
      const redirect = querys.get('redirect')
      if (redirect) {
        history.push(redirect)
      } else {
        history.push(`${config.pathPrefix}/home`)
      }
    }
    return {success, message}
  }

  logout = async () => {
    const {success} = await io.logout()
    if (!success) return
    runInAction(() => {
      this.userInfo = null
      history.push(`${config.pathPrefix}/system-login`)
    })
  }

  setValue(key, value) {
    switch (key) {
      case 'loading':
        this.modalVisible = value
        break
      default:
    }
  }

  // 这样写不会生效不会自动监听
  set(key, value) {
    if (isString(key)) {
      this.setValue(key, value)
    } else if (isPlainObject(key)) {
      Object.entries(key).forEach(([k, v]) => this.setValue(k, v))
    }
  }

  // 菜单栏的触发设置
  toggleCollapsed = () => {
    this.collapsed = !this.collapsed
  }
}
export default GlobalStore
