import request from '@/utils/request'

export function addQualification(query) {
  return request({
    url: '/web/qualification/addQualification',
    method: 'post',
    params: query
  })
}

export function getAllQualification(query) {
  return request({
    url: '/web/qualification/getQualificationList',
    method: 'get',
    params: query
  })
}

export function deleteQualification(query) {
  return request({
    url: '/web/qualification/deleteQualification',
    method: 'post',
    params: query
  })
}
