/*
 * @Author: changfeng
 * @LastEditors: changfeng
 * @LastEditTime: 2021-08-11 11:47:54
 * @Description: mock store 的处理
 */
import {makeAutoObservable, flow, runInAction, toJS} from 'mobx'
import isString from 'lodash/isString'
import moment from 'moment'
import isPlainObject from 'lodash/isPlainObject'
import {message, log} from '@src/utils'
import io from './io'

class ProjectManageStore {
  constructor(userInfo) {
    this.userInfo = userInfo
    makeAutoObservable(this)
  }

  // 显示的modal= projectDetailModal addMemberModal addProjectModal
  visibleModal = ''

  // 配置
  conditionConfig = {
    liftStateList: [
      {id: 0, name: '全部'},
      {id: 1, name: '进行中'},
      {id: 2, name: '已结束'},
    ],
    stageList: [],
    typeList: [],
    statusList: [],
    securityLevelList: [],
    mileList: [],
  }

  // 搜索项当前的值
  searchConditionValue = {
    liftState: null,
    search: null,
    stage: null,
    type: null,
    status: null,
  }

  tableData = {
    loading: false,
    count: 1,
    pageSize: 10,
    currentPage: 1,
    data: [],
  }

  // 加载配置
  loadingConfig = false

  // 记录详情
  record = {}

  allUser = [] // 组织架构成员信息

  allNoProject = [] // 获取未关联的商机列表

  loadedAllConfig = false

  getAllUserOpportunity = async () => {
    if (this.loadedAllConfig) return
    const [user, opportunity] = await Promise.all([io.getAllUser(), io.getAllNoProject()])
    runInAction(() => {
      this.loadedAllConfig = true
      if (user.success) {
        this.allUser = user.content
      }
      if (opportunity.success) {
        this.allNoProject = opportunity.content
      }
    })
  }

  // 获取筛选条件的配置
  getFilterList = async () => {
    this.loadingConfig = true
    const {success, content} = await io.getFilterList({
      typeStr: [
        // -- 主体信息
        'securityLevel', //  '保密等级',
        'stage',
        'type',
        'status',
        'mile', // 里程碑
      ].join(','),
    })
    runInAction(() => {
      this.loadingConfig = false
      if (success) {
        this.conditionConfig.stageList = [{id: 0, name: '不限'}].concat(content.stage)
        this.conditionConfig.typeList = [{id: 0, name: '全部类型'}].concat(content.type)
        this.conditionConfig.statusList = [{id: 0, name: '全部状态'}].concat(content.status)
        this.conditionConfig.mileList = content.mile?.map((item) => {
          item.milestoneName = item.name
          item.id = String(item.id)
          item.milestoneId = item.id
          return item
        })
        this.conditionConfig.securityLevelList = content.securityLevel
      }
    })
  }

  // 更新值
  setSearchConditionValue = (value, type) => {
    this.searchConditionValue[type] = value
    this.getProjectList(1)
  }

  // 搜索
  getProjectList = flow(function* getProjectList(page) {
    const params = {
      keyword: this.searchKeyword,
      // adminorgId: '行政机关id列表', // String 行政机关id列表 ,隔开
      currentPage: page || this.tableData.currentPage,
      pageSize: this.tableData.pageSize,
      ...this.searchConditionValue,
    }
    // 如果是搜索条件的情况下
    if (page) this.tableData.currentPage = page

    this.tableData.loading = true
    const {success, content} = yield io.getProjectList(params)
    this.tableData.loading = false
    if (!success) return
    this.tableData.count = content.count
    this.tableData.data = content.list
  })

  // 表单更新页码事件
  tableChange = (pageInfo) => {
    // {current: 1, size: 50, total: 9, showQuickJumper: true,showSizeChanger: true}
    this.tableData.currentPage = pageInfo.current
    this.tableData.pageSize = pageInfo.pageSize
    this.getProjectList()
  }

  // 项目详情
  isViewProject = false

  projectDetail = {}

  loadingDetail = false

  // 获取项目详情
  getProjectDetail = async (projectId) => {
    this.loadingDetail = true
    const {success, content} = await io.getProjectDetail({
      ':id': projectId,
    })
    runInAction(() => {
      this.loadingDetail = false
      if (success) {
        this.projectDetail = content
      }
    })
  }

  /**
   * 一定要this.xxx mobx才能知道响应
   * @param {*} key
   * @param {*} value
   */
  setValue(key, value) {
    switch (key) {
      case 'visibleModal':
        this.visibleModal = value
        break
      case 'record':
        this.record = value
        break
      case 'projectDetail':
        this.projectDetail = value
        break
      case 'isEditProject':
        this.isEditProject = value
        break
      default:
    }
  }

  /**
   * 设置值 两种方式
   * @param {string|object} key
   * @param {*} value
   */
  set(key, value) {
    // this[key] = value // 这样写不会生效不会自动监听
    if (isString(key)) {
      this.setValue(key, value)
    } else if (isPlainObject(key)) {
      Object.entries(key).forEach(([k, v]) => this.setValue(k, v))
    }
  }
}

export default ProjectManageStore
