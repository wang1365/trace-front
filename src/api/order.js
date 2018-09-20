import request from '@/utils/request'

export function addOrder(data) {
  return request({
    url: '/web/order/add',
    method: 'post',
    data: data
  })
}

export function getAllOrder(params) {
  return request({
    url: '/web/order/list',
    method: 'get',
    params: params
  })
}

export function deleteOrder(id) {
  return request({
    url: '/web/order/delete',
    method: 'post',
    params: { id }
  })
}
