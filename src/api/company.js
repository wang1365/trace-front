import request from '@/utils/request'

export function addCompany(data) {
  return request({
    url: '/web/company/addCompany',
    method: 'post',
    data: data
  })
}

export function updateCompany(data) {
  return request({
    url: '/web/company/updateCompany',
    method: 'post',
    data: data
  })
}

export function getAllCompany(params) {
  return request({
    url: '/web/company/getCompanyList',
    method: 'get',
    params: params
  })
}

export function deleteCompany(id) {
  return request({
    url: '/web/company/deleteCompany',
    method: 'post',
    params: { id }
  })
}
