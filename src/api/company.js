import request from '@/utils/request'

export function addCompany(data) {
  return request({
    url: '/web/company/add',
    method: 'post',
    data: data
  })
}

export function getAllCompany(params) {
  return request({
    url: '/web/company/list',
    method: 'get',
    params: params
  })
}

export function deleteCompany(id) {
  return request({
    url: '/web/company/delete',
    method: 'post',
    params: { id }
  })
}
