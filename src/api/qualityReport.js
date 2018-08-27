import request from '@/utils/request'

export function getAllQualityReport(query) {
  return request({
    url: '/qualityReport/list',
    method: 'get',
    params: query
  })
}
