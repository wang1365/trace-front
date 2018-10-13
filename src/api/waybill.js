import request from '@/utils/request'

export function getAllWaybill(params) {
  return request({
    url: '/web/waybill/getWaybillList',
    method: 'get',
    params: params
  })
}

export function addWaybill(params) {
  return request({
    url: '/web/waybill/addWaybill',
    method: 'post',
    data: params
  })
}
