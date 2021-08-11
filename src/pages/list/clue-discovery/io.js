import {createIo} from '@common/create-io'

const apis = {
  // 获取查询条件的配置
  getConfig: {
    method: 'GET',
    url: 'bas-config/list',
  },
  // 获取搜索历史
  getSearchHistories: {
    method: 'POST',
    url: 'bas-search-record/page',
  },
  // 获取搜索历史
  saveSearchHistory: {
    method: 'POST',
    url: 'bas-search-record/add',
  },
  // 获取搜索历史
  deleteSearchHistory: {
    url: 'bas-search-record/remove/:id',
    method: 'DELETE',
  },
  // 获取列表接口
  getDiscoveryList: {
    url: 'bas-inspect-record/page',
    method: 'POST',
  },
  // 添加标记
  addMark: {
    url: 'bas-record-sign/add',
    method: 'POST',
  },
  deleteMark: {
    url: 'bas-record-sign/remove/:id',
    method: 'DELETE',
  },
  // 获取详情 ?creditCode=111
  getDiscoveryInfo: {
    url: 'bas-inspect-record/info',
    method: 'GET',
  },
  // 获取线索的裁判文书列表分页 详情的refereeDocList
  getJudgmentList: {
    url: 'bas-referee-doc/page',
    method: 'POST',
  },
  // 	行政处罚表分页列表 ids传 详情的adminPunishList
  getPunishList: {
    url: 'bas-admin-punish/page',
    method: 'Post',
  },
  // 执行信息分页列表 ids传 详情的executeInfoList
  getExecuteList: {
    url: 'bas-execute-info/page',
    method: 'Post',
  },
  // 标记信息分页列表 ids传 详情的creditCode
  getMarkList: {
    url: 'bas-record-sign/page',
    method: 'Post',
  },
}
export default createIo(apis, 'clue-discovery')
