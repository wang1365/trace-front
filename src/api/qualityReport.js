import request from '@/utils/request'

export function addQualityReport(query) {
  return request({
    url: '/web/qualityReport/add',
    method: 'post',
    params: query
  })
}

export function getAllQualityReport(query) {
  return request({
    url: '/web/qualityReport/list',
    method: 'get',
    params: query
  })
}

export function deleteQualityReport(query) {
  return request({
    url: '/web/qualityReport/delete',
    method: 'post',
    params: query
  })
}
