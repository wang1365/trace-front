import request from '@/utils/request'

export function addQualityReport(query) {
  return request({
    url: '/web/qualityReport/addQualityReport',
    method: 'post',
    params: query
  })
}

export function getAllQualityReport(query) {
  return request({
    url: '/web/qualityReport/getQualityReportList',
    method: 'get',
    params: query
  })
}

export function deleteQualityReport(query) {
  return request({
    url: '/web/qualityReport/deleteQualityReport',
    method: 'post',
    params: query
  })
}
