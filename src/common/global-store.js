import {runInAction, makeAutoObservable} from 'mobx'
import {createIo} from './create-io'

// 用户登录相关接口配置
const apis = {
  login: {
    method: 'POST',
    url: '/login',
  },
  logout: {
    method: 'POST',
    url: '/auth/logout',
  },
  loginInfo: {
    method: 'GET',
    url: '/login_info',
  },
}
const io = createIo(apis, 'global')

export class GlobalStore {
  // 用户信息
  userInfo

  nickname

  constructor() {
    makeAutoObservable(this)
  }
  // 获取当前的登录信息

  async loginInfo() {
    if (this.userInfo) return
    const {success, content} = await io.loginInfo()
    if (!success) return
    runInAction(() => {
      this.userInfo = content
      this.nickname = content.nickname
    })
  }

  // 获取当前的登录信息
  async login(params) {
    const {success, content} = await io.login(params)
    if (!success) return
    runInAction(() => {
      this.userInfo = content
    })
  }
}
export default GlobalStore
