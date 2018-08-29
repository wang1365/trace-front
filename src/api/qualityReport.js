import request from '@/utils/request'

export function getAllQualityReport(query) {
  return request({
    url: '/qualityReport/list',
    method: 'get',
    params: query
  })
}

export function deleteQualityReport(query) {
  return request({
    url: '/qualityReport/delete',
    method: 'post',
    params: query
  })
}
