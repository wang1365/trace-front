import request from '@/utils/request'

export function addOrder(data) {
  return request({
    url: '/web/order/addOrder',
    method: 'post',
    data: data
  })
}

export function updateOrder(data) {
  return request({
    url: '/web/order/updateOrder',
    method: 'post',
    data: data
  })
}

export function getAllOrder(params) {
  return request({
    url: '/web/order/getOrderList',
    method: 'get',
    params: params
  })
}

export function deleteOrder(id) {
  return request({
    url: '/web/order/deleteOrder',
    method: 'post',
    params: { id }
  })
}
