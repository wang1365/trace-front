import request from '@/utils/request'

export function addQualification(query) {
  return request({
    url: '/web/qualification/add',
    method: 'post',
    params: query
  })
}

export function getAllQualification(query) {
  return request({
    url: '/web/qualification/list',
    method: 'get',
    params: query
  })
}

export function deleteQualification(query) {
  return request({
    url: '/web/qualification/delete',
    method: 'post',
    params: query
  })
}
