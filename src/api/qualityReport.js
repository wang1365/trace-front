import request from '@/utils/request'

export function addQualityReport(data) {
  return request({
    url: '/web/qualityReport/addQualityReport',
    method: 'post',
    data: data
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
