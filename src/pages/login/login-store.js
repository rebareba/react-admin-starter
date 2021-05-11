/*
 * @Author: changfeng
 * @LastEditors: changfeng
 * @LastEditTime: 2021-05-11 15:01:18
 * @Description:
 */
import {createIo} from '@common/create-io'
import {action, autorun, makeObservable, makeAutoObservable, observable} from 'mobx'
import {check, log} from '@utils'

const apis = {
  login: {
    method: 'POST',
    url: '/login',
  },
}

const io = createIo(apis, 'login')

class LoginStore {
  loading = false

  userInfo

  message = ''

  mobile = ''

  password = ''

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

  async login() {
    log(this.mobile, this.password, this.message)
    if (this.loading) return ''
    if (!check('mobile', this.mobile)) {
      this.message = '手机号码格式不正确'
      return ''
    }
    if (!this.password) {
      this.message = '请填写密码'
      return ''
    }
    this.loading = true
    const {success, message} = await io.login({mobile: this.mobile, password: this.password})
    this.loading = false
    if (!success) {
      this.message = message
      return ''
    }
    return ''
  }

  setPassword(value) {
    this.password = value
  }

  setMobile(value) {
    this.message = ''
    const reg = /^1([0-9]*)?$/
    if ((reg.test(value) && value.length < 12) || value === '') {
      this.mobile = value
    }
  }
}

const loginStore = new LoginStore()

// autorun(() => {
//   console.log('autorun', loginStore.mobile)
// })
export default loginStore
