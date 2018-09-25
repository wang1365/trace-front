import request from '@/utils/request'

export function getAllWaybill(params) {
  return request({
    url: '/web/waybill/list',
    method: 'get',
    params: params
  })
}
