import request from '@/utils/request'

// 查询岗位列表
export function listOffice(query) {
  return request({
    url: '/his/office/list',
    method: 'get',
    params: query
  })
}