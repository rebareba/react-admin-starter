/*
 * @Author: changfeng
 * @LastEditors: changfeng
 * @LastEditTime: 2021-08-10 16:32:12
 * @Description:
 */
import {createIo} from '@common/create-io'

const apis = {
  // 获取查询条件的配置
  getFilterList: {
    method: 'GET',
    url: `project/filter`,
  },
  addMember: {
    method: 'PUT',
    url: '/api/v1/dpm/project/:id/members',
  },
  // 获取项目列表
  getProjectList: {
    method: 'GET',
    url: `projects`,
  },
  // 获取我的项目列表
  getMySelfProjectList: {
    method: 'GET',
    url: `user/projects`,
  },
  // 结束项目
  finishProject: {
    method: 'POST',
    url: `project/state/:id`,
  },
  // 删除项目
  deleteProject: {
    method: 'DELETE',
    url: `project/:id`,
  },
  // 获取组织架构人员列表
  getAllUser: {
    method: 'GET',
    url: `open/members/simple`,
  },
  // 获取未关联的商机列表
  getAllNoProject: {
    method: 'GET',
    url: '/api/v1/dpm/opportunities/no_project',
  },
  // 新建项目
  createProject: {
    method: 'POST',
    url: `project`,
  },
  // 获取项目详情
  getProjectDetail: {
    method: 'GET',
    url: `project/info/:id`,
  },
  // 编辑项目
  editProject: {
    method: 'PUT',
    url: `project/:id`,
  },
  // 里程碑默认值
  getMileArr: {
    method: 'GET',
    url: `project/enumeration`,
  },

  addMilestone: {
    method: 'POST',
    url: `project/:id/milestones`,
  },
  updateMilestone: {
    method: 'PUT',
    url: `project/:id/milestones`,
  },

  getEnum: {
    method: 'GET',
    url: `project/enumeration`,
  },

  // 新增阶段计划
  addStage: {
    method: 'POST',
    url: `project/:id/stages`,
  },
  // 修改项目阶段信息
  updateStage: {
    method: 'PUT',
    url: `project/:id/stages`,
  },
}
export default createIo(apis, 'project-manage')
