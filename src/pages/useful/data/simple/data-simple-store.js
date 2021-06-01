import {createIo} from '@common/create-io'
import isString from 'lodash/isString'
import isPlainObject from 'lodash/isPlainObject'
import {makeAutoObservable} from 'mobx'
// import {check, log} from '@utils'

const apis = {
  login: {
    method: 'POST',
    url: 'login',
  },
}

const io = createIo(apis, 'login')

class DataSimpleStore {
  tableLoading = false

  list = []

  pagination = {
    pageSize: 10,
    currentPage: 1,
    count: 0,
  }

  // modal
  modalVisible = false

  isEdit = false

  submiting = false

  detail

  constructor() {
    makeAutoObservable(this)
  }

  handleChange() {}

  setValue(key, value) {
    switch (key) {
      case 'modalVisible':
        this.modalVisible = value
        break
      case 'submiting':
        this.submiting = value
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

  editItem(item) {
    this.modalVisible = true
    if (item) {
      this.isEdit = true
      this.detail = item
    } else {
      this.isEdit = false
    }
  }
}

export default new DataSimpleStore()
