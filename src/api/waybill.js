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

export function updateWaybill(params) {
  return request({
    url: 'web/waybill/updateWaybill',
    method: 'post',
    data: params
  })
}

export function deleteWaybill(id) {
  return request({
    url: '/web/waybill/deleteWaybill',
    method: 'post',
    params: { id }
  })
}

