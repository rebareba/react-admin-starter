import {makeAutoObservable, flow, runInAction, toJS} from 'mobx'
import isString from 'lodash/isString'
import moment from 'moment'
import isPlainObject from 'lodash/isPlainObject'
import {message} from '@src/utils'
import io from './io'

const MonthArray = [
  {
    name: '1个月内',
    value: [moment().subtract(1, 'months').format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')].join(','),
  },
  {
    name: '1-3个月',
    value: [
      moment().subtract(3, 'months').format('YYYY-MM-DD'),
      moment().subtract(1, 'months').format('YYYY-MM-DD'),
    ].join(','),
  },
  {
    name: '3-6个月',
    value: [
      moment().subtract(6, 'months').format('YYYY-MM-DD'),
      moment().subtract(3, 'months').format('YYYY-MM-DD'),
    ].join(','),
  },
  {
    name: '6-12个月',
    value: [
      moment().subtract(12, 'months').format('YYYY-MM-DD'),
      moment().subtract(6, 'months').format('YYYY-MM-DD'),
    ].join(','),
  },
  {
    name: '12个月以上',
    value: ['1000-01-01', moment().subtract(12, 'months').format('YYYY-MM-DD')].join(','),
  },
]
const MoneyArray = [
  {
    name: '1万以内',
    value: [0, 1 * 100000].join(','),
  },
  {
    name: '1-5万',
    value: [1 * 100000, 5 * 100000].join(','),
  },
  {
    name: '5-10万',
    value: [5 * 100000, 10 * 100000].join(','),
  },
  {
    name: '10-20万',
    value: [10 * 100000, 20 * 100000].join(','),
  },
  {
    name: '20-50万',
    value: [20 * 100000, 50 * 100000].join(','),
  },
  {
    name: '50万以上',
    value: [50 * 100000, 100000000 * 100000].join(','),
  },
]
class ClueDiscoveryStore {
  constructor(userInfo) {
    console.log('222222222222222222222')
    this.userInfo = userInfo
    makeAutoObservable(this)
  }

  // 显示的modal= saveSearch  manageSearch mark
  showModal = ''

  count = 1

  searchKeyword = ''

  searchTypes = [
    {
      name: '不限',
      value: 'other',
    },
    {
      name: '主体名称',
      value: 'subject_name',
    },
    {
      name: '统一社会信用代码',
      value: 'credit_code',
    },
    {
      name: 'F定代表人名称',
      value: 'legal_person',
    },
    {
      name: '裁判案件名称',
      value: 'doc_title',
    },
    {
      name: '裁判案号',
      value: 'doc_code',
    },
    {
      name: '执行案件名称',
      value: 'info_title',
    },
    {
      name: '执行案号',
      value: 'info_code',
    },
    {
      name: '行政处罚案件名称',
      value: 'punish_title',
    },
    {
      name: '行政处罚案号',
      value: 'punish_code',
    },
    {
      name: '内容关键词',
      value: 'content',
    },
    {
      name: 'SP人员',
      value: 'judge',
    },
    {
      name: '律师',
      value: 'law_firm',
    },
    {
      name: '律所',
      value: 'lawyer',
    },
  ]

  searchType = 'other'

  historySearchs = []

  get tableHistorySearchs() {
    return this.historySearchs.slice((this.historySearchCurrent - 1) * 5, (this.historySearchCurrent - 1) * 5 + 5)
  }

  historySearchCurrent = 1

  // 选择了使用历史的搜索记录
  useHistorySearch = (id) => {
    console.log('useHistorySearch', id)
    const history = this.historySearchs.find((item) => item.id === id)
    if (history) {
      // TOOD 处理搜索历史的填补
      this.searchType = history.type
      this.searchKeyword = history.keyword
      this.conditionsSelected = history.basSearchTerms || []
    }
  }

  getSearchHistories = async () => {
    const {success, content} = await io.getSearchHistories({
      size: 1000,
      page: 1,
    })
    runInAction(() => {
      if (!success) return
      this.historySearchs = content.records
      this.historySearchCurrent = 1
    })
  }

  saveSearchHistory = async (title) => {
    const params = {
      title,
      type: this.searchType,
      keyword: this.searchKeyword,
      basSearchTerms: toJS(this.conditionsSelected),
    }
    const {success} = await io.saveSearchHistory(params)
    runInAction(() => {
      if (!success) return
      message.success('保存成功')
      this.getSearchHistories()
    })
  }

  deleteSearchHistory = async (item) => {
    const {success} = await io.deleteSearchHistory({
      ':id': item.id,
    })
    if (!success) return
    message.success('删除成功')
    this.getSearchHistories()
  }

  tableData = {
    loading: false,
    count: 1,
    size: 10,
    page: 1,
    data: [
      {
        id: 1,
        clueCode: 'xxxxx线索编号',
        adminorgName: '行政机关名称',
        caseLevelName: '重案等级',
        clueContent: '线索内容',
        clueName: '线索名称',
        clueSummary: '线索摘要',
        earliestCptTime: '最早投诉时间',
        fact1typeName: '违法事实大类名称违法事实大类名称违法事实大类名称违法事实大类名称',
        fact2typeName: '违法事实小类名称',
        invaild: '是否无效 N 有效 Y 无效',
        latestCptTime: '最新投诉时间',
        modeName: '办案方式',
        projectName: '专案名称',
        recordCtime: '记录创建时间',
        regionName: '地区名称',
        specialName: '专项名称',
        statusName: '拟案状态',
        typeName: '拟案类型',
        warnStatusName: '预警状态',
      },
    ],
  }

  // 主体信息
  subjectSectionConditions = {
    title: '主体信息',
    sectionKey: 'subject',
    conditions: [
      {
        isMulti: true,
        title: '行业领域',
        key: 'trade_field_id',
        // custom: true,
        // customType: 'number',
        // customUnit: '万',
        value: [],
      },
      {
        isMulti: true,
        title: '行政区域',
        key: 'region_id',
        value: [
          {
            name: '鹿城区',
            value: '1',
          },
        ],
      },
      {
        isMulti: true,
        title: '企业类型',
        key: 'enterprise_type_id',
        value: [],
      },
      {
        isMulti: true,
        title: '组织机构',
        key: 'organization_id',
        value: [],
      },
      {
        isMulti: true,
        title: '登记状态',
        key: 'register_status',
        value: [],
      },
      {
        isMulti: true,
        title: '经验状态',
        key: 'operation_status',
        value: [],
      },
      {
        isMulti: true,
        title: '成立年限',
        key: 'found_time',
        custom: true,
        customType: 'number',
        customUnit: '年',
        freeze: true, // 写死
        value: [
          {
            name: '1年内',
            value: [moment().subtract(1, 'years').format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')].join(','),
          },
          {
            name: '1-3年',
            value: [
              moment().subtract(3, 'years').format('YYYY-MM-DD'),
              moment().subtract(1, 'years').format('YYYY-MM-DD'),
            ].join(','),
          },
          {
            name: '3-5年',
            value: [
              moment().subtract(5, 'years').format('YYYY-MM-DD'),
              moment().subtract(3, 'years').format('YYYY-MM-DD'),
            ].join(','),
          },
          {
            name: '5-10年',
            value: [
              moment().subtract(10, 'years').format('YYYY-MM-DD'),
              moment().subtract(5, 'years').format('YYYY-MM-DD'),
            ].join(','),
          },
          {
            name: '10年以上',
            value: ['1000-01-01', moment().subtract(10, 'years').format('YYYY-MM-DD')].join(','),
          },
        ],
      },
      {
        isMulti: true,
        title: '注册资本',
        key: 'register_capital',
        custom: true,
        customType: 'number',
        customUnit: '万',
        freeze: true, // 写死
        value: [
          {
            name: '100万以内',
            value: [0, 100 * 100000].join(','),
          },
          {
            name: '100-200万',
            value: [100 * 100000, 200 * 100000].join(','),
          },
          {
            name: '200-500万',
            value: [200 * 100000, 500 * 100000].join(','),
          },
          {
            name: '500-1000万',
            value: [500 * 100000, 1000 * 100000].join(','),
          },
          {
            name: '1000-5000万',
            value: [1000 * 100000, 5000 * 100000].join(','),
          },
          {
            name: '5000万以上',
            value: [5000 * 100000, 100000000 * 100000].join(','),
          },
        ],
      },
      {
        isMulti: true,
        title: '实缴资本',
        key: 'paid_capital',
        custom: true,
        customType: 'number',
        customUnit: '万',
        freeze: true, // 写死
        value: [
          {
            name: '10万以内',
            value: [0, 10 * 100000].join(','),
          },
          {
            name: '10-100万',
            value: [10 * 100000, 100 * 100000].join(','),
          },
          {
            name: '100-200万',
            value: [100 * 100000, 200 * 100000].join(','),
          },
          {
            name: '200-500万',
            value: [200 * 100000, 500 * 100000].join(','),
          },
          {
            name: '500-1000万',
            value: [500 * 100000, 1000 * 100000].join(','),
          },
          {
            name: '1000-5000万',
            value: [1000 * 100000, 5000 * 100000].join(','),
          },
          {
            name: '5000万以上',
            value: [5000 * 100000, 100000000 * 100000].join(','),
          },
        ],
      },
      {
        isMulti: true,
        title: '资本类型',
        key: 'capital_type',
        value: [],
      },
      {
        isMulti: true,
        title: '纳税信用',
        key: 'tax_credit',
        value: [],
      },
      {
        isMulti: true,
        title: '参保人数',
        key: 'insured_num',
        custom: true,
        customType: 'number',
        customUnit: '人',
        freeze: true, // 写死
        value: [
          {
            name: '0人',
            value: '0,0',
          },
          {
            name: '1-4人',
            value: '1,4',
          },
          {
            name: '5-9人',
            value: '5,9',
          },
          {
            name: '10-19人',
            value: '10,19',
          },
          {
            name: '20-99人',
            value: '20,99',
          },
          {
            name: '100-499人',
            value: '100,499',
          },
          {
            name: '1000-4999人',
            value: '1000,4999',
          },
          {
            name: '5000-9999人',
            value: '5000,9999',
          },
          {
            name: '10000人以上',
            value: '10000,10000000',
          },
        ],
      },
      {
        isMulti: true,
        title: '工商变更',
        key: 'business_change_id',
        value: [],
      },
    ],
  }

  // 裁判文书

  // -- 裁判文书
  judgementSectionConditions = {
    title: '裁判文书',
    sectionKey: 'judgement',
    conditions: [
      {
        isMulti: true,
        title: '审理程序',
        key: 'trial_procedure_id',
        value: [],
      },
      {
        isMulti: true,
        title: '审理法院',
        key: 'court_id',
        value: [],
      },
      {
        isMulti: true,
        title: '裁判日期',
        key: 'sentence_date',
        custom: true,
        customType: 'date',
        customUnit: '日',
        freeze: true, // 写死
        value: MonthArray,
      },
      {
        isMulti: true,
        title: '发布日期',
        key: 'publish_date',
        custom: true,
        customType: 'date',
        customUnit: '日',
        freeze: true, // 写死
        value: MonthArray,
      },
      {
        isMulti: true,
        title: '公开类型',
        key: 'open_type',
        value: [],
      },
      {
        isMulti: true,
        title: '文书类型',
        key: 'doc_type',
        value: [],
      },
    ],
  }

  // 执行公开
  executeSectionConditions = {
    title: '执行公开',
    sectionKey: 'execute',
    conditions: [
      {
        isMulti: true,
        title: '立案日期',
        key: 'register_date',
        custom: true,
        customType: 'date',
        customUnit: '日',
        freeze: true, // 写死
        value: MonthArray,
      },
      {
        isMulti: true,
        title: '是否失信',
        key: 'no_credit',
        value: [],
      },
      {
        isMulti: true,
        title: '是否限消',
        key: 'limit_pin',
        value: [],
      },
      {
        isMulti: true,
        title: '终本日期',
        key: 'final_date',
        custom: true,
        customType: 'date',
        customUnit: '日',
        freeze: true, // 写死
        value: MonthArray,
      },
      {
        isMulti: true,
        title: '执行标的',
        key: 'execute_target',
        custom: true,
        customType: 'number',
        customUnit: '万',
        freeze: true, // 写死
        value: MoneyArray,
      },
      {
        isMulti: true,
        title: '未履金额',
        key: 'no_perform_money',
        custom: true,
        customType: 'number',
        customUnit: '万',
        freeze: true, // 写死
        value: MoneyArray,
      },
    ],
  }

  // 行政处罚
  punishmentSectionConditions = {
    title: '行政处罚',
    sectionKey: 'punishment',
    conditions: [
      {
        isMulti: true,
        title: '处罚金额',
        key: 'punish_money',
        custom: true,
        customType: 'number',
        customUnit: '万',
        freeze: true, // 写死
        value: MoneyArray,
      },
      {
        isMulti: true,
        title: '没收金额',
        key: 'confiscate_money',
        custom: true,
        customType: 'number',
        customUnit: '万',
        freeze: true, // 写死
        value: MoneyArray,
      },
      {
        isMulti: true,
        title: '处罚决定日期',
        key: 'decision_date',
        custom: true,
        customType: 'date',
        customUnit: '日',
        freeze: true, // 写死
        value: MonthArray,
      },
      {
        isMulti: true,
        title: '处罚是否变更',
        key: 'punish_is_change',
        value: [],
      },
    ],
  }

  loadingConfig = true

  // 获取配置
  getConfig = async () => {
    /*
    -- 模糊搜索项
    ('主体名称', 'subject_name',
    ('统一社会信用代码', 'credit_code',
    ('F定代表人名称', 'legal_person',
    ('裁判案件名称', 'doc_title',
    ('裁判案号', 'doc_code',
    ('执行案件名称', 'info_title',
    ('执行案号', 'info_code',
    ('行政处罚案件名称', 'punish_title',
    ('行政处罚案号', 'punish_code',
    ('内容关键词', 'content',
    ('SP人员', 'judge',
    ('律师', 'law_firm',
    ('律所', 'lawyer',
    */
    this.loadingConfig = true
    const {success, content} = await io.getConfig({
      typeStr: [
        // -- 主体信息
        'trade_field_id', //  '行业领域',
        'region_id', // ('行政区域',
        'enterprise_type_id', //  ('企业类型',
        'organization_id', //    ('组织机构',
        'register_status', // ('登记状态',
        'operation_status', // ('经验状态',
        'found_time', // ('成立年限',
        'register_capital', //  ('注册资本',
        'paid_capital', // ('实缴资本',
        'capital_type', //  ('资本类型',
        'tax_credit', // ('纳税信用',
        'insured_num', // ('参保人数',
        'business_change_id', // ('工商变更',
        // -- 裁判文书
        'sentence_date', // ('裁判日期',
        'publish_date', //  ('发布日期',
        'trial_procedure_id', // ('审理程序',
        'court_id', // ('审理法院',
        'open_type', //  ('公开类型',
        'doc_type', //  ('文书类型',
        // -- 执行公开
        'register_date', //   ('立案日期',
        'final_date', // ('终本日期',
        'execute_target', //   ('执行标的',
        'no_perform_money', //  ('未履金额',
        'no_credit', // ('是否失信',
        'limit_pin', //  ('是否限消',
        // -- 行政处罚
        'punish_money', // ('处罚金额',
        'confiscate_money', // ('没收金额',
        'decision_date', // ('处罚决定日期',
        'punish_is_change', //   ('处罚是否变更',
      ].join(','),
    })
    runInAction(() => {
      this.loadingConfig = false
    })
    if (!success) return
    runInAction(() => {
      const subjectConditions = []
      this.subjectSectionConditions.conditions.forEach((item) => {
        const ret = content.find((i) => i.key === item.key)
        if (ret) {
          item.title = ret.title
          if (item.freeze) {
            return subjectConditions.push(item)
          }
          if (ret.value.length > 0) {
            item.value = ret.value
            subjectConditions.push(item)
          }
        }
        if (item.freeze) {
          subjectConditions.push(item)
        }
        return ''
      })
      this.subjectSectionConditions.conditions = subjectConditions

      const judgementConditions = []
      this.judgementSectionConditions.conditions.forEach((item) => {
        const ret = content.find((i) => i.key === item.key)
        if (ret) {
          item.title = ret.title
          if (item.freeze) {
            return judgementConditions.push(item)
          }
          if (ret.value.length > 0) {
            item.value = ret.value
            judgementConditions.push(item)
          }
        }
        if (item.freeze) {
          judgementConditions.push(item)
        }
        return ''
      })
      this.judgementSectionConditions.conditions = judgementConditions

      const executeConditions = []
      this.executeSectionConditions.conditions.forEach((item) => {
        const ret = content.find((i) => i.key === item.key)
        if (ret) {
          item.title = ret.title
          if (item.freeze) {
            return executeConditions.push(item)
          }
          if (ret.value.length > 0) {
            item.value = ret.value
            executeConditions.push(item)
          }
        }
        if (item.freeze) {
          executeConditions.push(item)
        }
        return ''
      })
      this.executeSectionConditions.conditions = executeConditions

      const punishmentConditions = []
      this.punishmentSectionConditions.conditions.forEach((item) => {
        const ret = content.find((i) => i.key === item.key)
        if (ret) {
          item.title = ret.title
          if (item.freeze) {
            return punishmentConditions.push(item)
          }
          if (ret.value.length > 0) {
            item.value = ret.value
            punishmentConditions.push(item)
          }
        }
        if (item.freeze) {
          punishmentConditions.push(item)
        }
        return ''
      })
      this.punishmentSectionConditions.conditions = punishmentConditions
    })
  }

  // 活跃的ta
  conditionsActive = {
    punishment: '',
    execute: '',
    judgement: '',
    subject: '',
  }

  // 选中的东西
  conditionsSelected = []

  // 表格的默认页码修改
  tableChange = (pageInfo) => {
    // {current: 1, size: 50, total: 9, showQuickJumper: true,showSizeChanger: true}
    this.tableData.page = pageInfo.current
    this.tableData.size = pageInfo.pageSize
    this.getDiscoveryList()
  }

  // 搜索
  getDiscoveryList = flow(function* getList(page, flag) {
    console.log('getDiscoveryList', page, flag)
    const params = {
      keyword: this.searchKeyword,
      // adminorgId: '行政机关id列表', // String 行政机关id列表 ,隔开
      page: page || this.tableData.page,
      size: this.tableData.size,
      type: this.searchType,
      searchTermList: [],
    }
    // 如果是搜索条件的情况下
    if (flag !== 'search') {
      console.log('toJS(this.conditionsSelected)', toJS(this.conditionsSelected))
      params.searchTermList = this.conditionsSelected.map((item) => ({typeCode: item.key, dataCode: item.value}))
    }
    if (page) this.tableData.page = page

    this.tableData.loading = true
    const {success, content} = yield io.getDiscoveryList(params)
    this.tableData.loading = false
    if (!success) return
    this.tableData.count = content.total
    this.tableData.data = content.records
  })

  setActiveCondition = (key, value) => {
    switch (key) {
      case 'punishment':
        this.conditionsActive.punishment = value
        break
      case 'execute':
        this.conditionsActive.execute = value
        break
      case 'judgement':
        this.conditionsActive.judgement = value
        break
      case 'subject':
        this.conditionsActive.subject = value
        break
      default:
    }
  }

  // 记录详情
  discoveryInfo = {}

  // 保存标记
  saveMark = async (mark) => {
    const {success, content} = await io.addMark({
      content: mark,
      creditCode: this.discoveryInfo.creditCode,
      inspectRecordId: this.discoveryInfo.id,
    })
    if (!success) return
    message.success('添加标记成功')
    this.tableData.data = this.tableData.data.map((item) => {
      if (item.id === this.discoveryInfo.id) {
        item.isSign = 1
      }
      return item
    })
  }

  deleteMark = async (record) => {
    const {success, content} = await io.deleteMark({
      ':id': record.id,
    })
    if (!success) return
    this.getMarkList(1)
  }

  loadingDetail = false

  // 获取详情
  getDiscoverInfo = async (creditCode) => {
    this.loadingDetail = true

    const {success, content} = await io.getDiscoveryInfo({
      creditCode,
    })
    runInAction(() => {
      this.loadingDetail = false
      if (!success) return
      this.discoveryInfo = content
    })
  }

  // 裁判文书
  judgmentTableData = {
    loading: false,
    count: 1,
    size: 10,
    page: 1,
    data: [],
  }

  getJudgmentList = async (page) => {
    if (!this.discoveryInfo.refereeDocList || this.discoveryInfo.refereeDocList.length === 0) return
    this.judgmentTableData.loading = true
    const params = {
      ids: this.discoveryInfo.refereeDocList,
      // adminorgId: '行政机关id列表', // String 行政机关id列表 ,隔开
      page: page || this.judgmentTableData.page,
      size: this.judgmentTableData.size,
    }
    if (page) this.judgmentTableData.page = page
    const {success, content} = await io.getJudgmentList(params)
    runInAction(() => {
      this.judgmentTableData.loading = false
      if (!success) return
      this.judgmentTableData.count = content.total
      this.judgmentTableData.data = content.records
    })
  }

  // 	行政处罚表分页列表
  punishTableData = {
    loading: false,
    count: 1,
    size: 10,
    page: 1,
    data: [],
  }

  getPunishList = async (page) => {
    if (!this.discoveryInfo.adminPunishList || this.discoveryInfo.adminPunishList.length === 0) return
    this.punishTableData.loading = true
    const params = {
      ids: this.discoveryInfo.adminPunishList,
      // adminorgId: '行政机关id列表', // String 行政机关id列表 ,隔开
      page: page || this.punishTableData.page,
      size: this.punishTableData.size,
    }
    if (page) this.punishTableData.page = page
    const {success, content} = await io.getPunishList(params)
    runInAction(() => {
      this.punishTableData.loading = false
      if (!success) return
      this.punishTableData.count = content.total
      this.punishTableData.data = content.records
    })
  }

  // 	行政处罚表分页列表
  executeTableData = {
    loading: false,
    count: 1,
    size: 10,
    page: 1,
    data: [],
  }

  getExecuteList = async (page) => {
    if (!this.discoveryInfo.executeInfoList || this.discoveryInfo.executeInfoList.length === 0) return
    this.executeTableData.loading = true
    const params = {
      ids: this.discoveryInfo.executeInfoList,
      // adminorgId: '行政机关id列表', // String 行政机关id列表 ,隔开
      page: page || this.executeTableData.page,
      size: this.executeTableData.size,
    }
    if (page) this.executeTableData.page = page
    const {success, content} = await io.getExecuteList(params)
    runInAction(() => {
      this.executeTableData.loading = false
      if (!success) return
      this.executeTableData.count = content.total
      this.executeTableData.data = content.records
    })
  }

  // 标记表分页列表
  markTableData = {
    loading: false,
    count: 1,
    size: 10,
    page: 1,
    data: [],
  }

  getMarkList = async (page) => {
    this.markTableData.loading = true
    const params = {
      creditCode: this.discoveryInfo.creditCode,
      // adminorgId: '行政机关id列表', // String 行政机关id列表 ,隔开
      page: page || this.markTableData.page,
      size: this.markTableData.size,
    }
    if (page) this.markTableData.page = page
    const {success, content} = await io.getMarkList(params)
    runInAction(() => {
      this.markTableData.loading = false
      if (!success) return
      this.markTableData.count = content.total
      this.markTableData.data = content.records
    })
  }

  download = (filePath, fileName) => {
    console.log(filePath, fileName)

    if (filePath) {
      const a = document.createElement('a')
      a.href = filePath
      a.download = fileName || filePath
      a.click()
    } else {
      message.error('未找到该文件！')
    }
  }

  // 通用的设置属性的值
  setValue(key, value) {
    switch (key) {
      case 'conditionsSelected':
        this.conditionsSelected = value
        break
      case 'searchType':
        this.searchType = value
        break
      case 'showModal':
        this.showModal = value
        break
      case 'keyword':
        this.keyword = value
        break
      case 'addEditModalVisiable':
        this.addEditModalVisiable = value
        break
      case 'historySearchCurrent':
        this.historySearchCurrent = value
        break
      case 'searchKeyword':
        this.searchKeyword = value
        break
      case 'discoveryInfo':
        this.discoveryInfo = value
        break
      default:
    }
  }

  // 两种设置方式 key value 和 简单对象
  set(key, value) {
    // this[key] = value // 这样写不会生效不会自动监听
    if (isString(key)) {
      this.setValue(key, value)
    } else if (isPlainObject(key)) {
      Object.entries(key).forEach(([k, v]) => this.setValue(k, v))
    }

    const params = [
      {
        name: '行业领域',
        code: 'hyly',
        prent: 'xxx',
        value: '1',
      },
      {
        name: '行业领域',
        code: 'hyly',
        value: '1',
      },
    ]
  }
}

export default ClueDiscoveryStore
