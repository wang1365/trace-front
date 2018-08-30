import request from '@/utils/request'

export function addGoods(name, imageUrl) {
  return request({
    url: '/web/goods/add',
    method: 'post',
    data: { name, imageUrl }
  })
}

export function getAllGoods(query) {
  return request({
    url: '/web/goods/list',
    method: 'get',
    params: query
  })
}

export function deleteGoods(id) {
  return request({
    url: '/web/goods/delete',
    method: 'post',
    params: { id }
  })
}
