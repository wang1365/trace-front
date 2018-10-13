import request from '@/utils/request'

export function addGoods(data) {
  return request({
    url: '/web/goods/addGoods',
    method: 'post',
    data: data
  })
}

export function updateGoods(data) {
  return request({
    url: '/web/goods/updateGoods',
    method: 'post',
    data: data
  })
}

export function getAllGoods(params) {
  return request({
    url: '/web/goods/list',
    method: 'get',
    params: params
  })
}

export function deleteGoods(id) {
  return request({
    url: '/web/goods/delete',
    method: 'post',
    params: { id }
  })
}
